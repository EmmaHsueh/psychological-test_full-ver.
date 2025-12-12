/**
 * 進階推薦引擎
 * 基於多重因素的智能測驗推薦系統
 *
 * 考慮因素：
 * 1. 用戶歷史偏好（類別、標籤）
 * 2. 測驗熱度
 * 3. 時間間隔（避免重複推薦）
 * 4. 主題多樣性
 * 5. 每日變化
 */

import { TEST_DATABASE } from './testDatabase.js';
import { getHistory } from './storage.js';

/**
 * 推薦引擎配置
 */
const RECOMMENDATION_CONFIG = {
  // 權重配置
  weights: {
    userPreference: 0.35,    // 用戶偏好權重
    popularity: 0.25,        // 熱度權重
    diversity: 0.20,         // 多樣性權重
    recency: 0.20           // 時間新鮮度權重
  },

  // 推薦數量
  dailyRecommendationCount: 1,
  pageRecommendationCount: 6,

  // 時間窗口（天）
  recentHistoryWindow: 30,
  avoidRepeatWindow: 7
};

/**
 * 獲取用戶偏好分析
 */
function analyzeUserPreferences() {
  const history = getHistory();

  if (!history || history.length === 0) {
    return {
      categories: {},
      tags: {},
      totalTests: 0,
      recentTests: []
    };
  }

  // 統計類別偏好
  const categoryCount = {};
  const tagCount = {};
  const recentTests = [];

  // 獲取最近30天的記錄
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - RECOMMENDATION_CONFIG.recentHistoryWindow);

  history.forEach(record => {
    const recordDate = new Date(record.timestamp);

    // 從testId查找對應的測驗數據
    const test = TEST_DATABASE.find(t => t.id === record.testId);

    if (test) {
      // 統計類別
      categoryCount[test.category] = (categoryCount[test.category] || 0) + 1;

      // 統計標籤
      test.tags.forEach(tag => {
        tagCount[tag] = (tagCount[tag] || 0) + 1;
      });

      // 記錄最近測驗
      if (recordDate >= thirtyDaysAgo) {
        recentTests.push({
          testId: test.id,
          category: test.category,
          timestamp: record.timestamp
        });
      }
    }
  });

  return {
    categories: categoryCount,
    tags: tagCount,
    totalTests: history.length,
    recentTests: recentTests
  };
}

/**
 * 計算測驗與用戶偏好的匹配度
 */
function calculatePreferenceScore(test, userPreferences) {
  if (userPreferences.totalTests === 0) {
    return 0.5; // 新用戶，返回中性分數
  }

  let score = 0;
  let totalWeight = 0;

  // 類別匹配度
  const categoryScore = (userPreferences.categories[test.category] || 0) / userPreferences.totalTests;
  score += categoryScore * 0.6;
  totalWeight += 0.6;

  // 標籤匹配度
  let tagScore = 0;
  const totalTags = Object.values(userPreferences.tags).reduce((sum, count) => sum + count, 0);

  test.tags.forEach(tag => {
    tagScore += (userPreferences.tags[tag] || 0) / totalTags;
  });

  tagScore = tagScore / test.tags.length;
  score += tagScore * 0.4;
  totalWeight += 0.4;

  return score / totalWeight;
}

/**
 * 計算測驗的新鮮度分數
 */
function calculateRecencyScore(test, userPreferences) {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - RECOMMENDATION_CONFIG.avoidRepeatWindow);

  // 檢查是否在最近7天內做過此測驗或相同類別
  const recentSameTest = userPreferences.recentTests.find(
    record => record.testId === test.id
  );

  if (recentSameTest) {
    const daysSince = (new Date() - new Date(recentSameTest.timestamp)) / (1000 * 60 * 60 * 24);
    return Math.max(0, daysSince / RECOMMENDATION_CONFIG.avoidRepeatWindow);
  }

  // 檢查同類別測驗的新鮮度
  const recentSameCategory = userPreferences.recentTests.filter(
    record => record.category === test.category
  );

  if (recentSameCategory.length === 0) {
    return 1; // 沒做過該類別，新鮮度最高
  }

  // 計算平均間隔
  const avgDaysSince = recentSameCategory.reduce((sum, record) => {
    const days = (new Date() - new Date(record.timestamp)) / (1000 * 60 * 60 * 24);
    return sum + days;
  }, 0) / recentSameCategory.length;

  return Math.min(1, avgDaysSince / 14); // 14天為滿分
}

/**
 * 計算測驗的多樣性分數
 */
function calculateDiversityScore(test, userPreferences, candidateTests) {
  if (userPreferences.totalTests === 0) {
    return 1; // 新用戶，鼓勵多樣性
  }

  // 計算該類別在用戶歷史中的比例
  const categoryRatio = (userPreferences.categories[test.category] || 0) / userPreferences.totalTests;

  // 類別比例越低，多樣性分數越高
  return 1 - categoryRatio;
}

/**
 * 計算測驗的綜合推薦分數
 */
function calculateRecommendationScore(test, userPreferences) {
  const weights = RECOMMENDATION_CONFIG.weights;

  // 用戶偏好分數
  const preferenceScore = calculatePreferenceScore(test, userPreferences);

  // 熱度分數（歸一化到0-1）
  const popularityScore = test.popularity / 100;

  // 新鮮度分數
  const recencyScore = calculateRecencyScore(test, userPreferences);

  // 多樣性分數
  const diversityScore = calculateDiversityScore(test, userPreferences);

  // 綜合計算
  const totalScore =
    preferenceScore * weights.userPreference +
    popularityScore * weights.popularity +
    recencyScore * weights.recency +
    diversityScore * weights.diversity;

  return {
    test,
    score: totalScore,
    breakdown: {
      preference: preferenceScore,
      popularity: popularityScore,
      recency: recencyScore,
      diversity: diversityScore
    }
  };
}

/**
 * 獲取每日推薦測驗
 * 使用日期作為種子，確保同一天返回相同結果
 */
export function getDailyRecommendation() {
  const userPreferences = analyzeUserPreferences();

  // 計算所有測驗的推薦分數
  const scoredTests = TEST_DATABASE.map(test =>
    calculateRecommendationScore(test, userPreferences)
  );

  // 按分數排序
  scoredTests.sort((a, b) => b.score - a.score);

  // 取前10名候選
  const topCandidates = scoredTests.slice(0, 10);

  // 使用日期作為種子，從前10名中選擇
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 1000 / 60 / 60 / 24);
  const selectedIndex = dayOfYear % topCandidates.length;

  return {
    test: topCandidates[selectedIndex].test,
    score: topCandidates[selectedIndex].score,
    breakdown: topCandidates[selectedIndex].breakdown,
    reason: generateRecommendationReason(topCandidates[selectedIndex], userPreferences)
  };
}

/**
 * 獲取多個推薦測驗（用於推薦頁面）
 */
export function getMultipleRecommendations(count = 6) {
  const userPreferences = analyzeUserPreferences();

  // 計算所有測驗的推薦分數
  const scoredTests = TEST_DATABASE.map(test =>
    calculateRecommendationScore(test, userPreferences)
  );

  // 按分數排序
  scoredTests.sort((a, b) => b.score - a.score);

  // 確保多樣性：從不同類別中選擇
  const selectedTests = [];
  const usedCategories = new Set();

  // 第一輪：每個類別選一個最高分
  for (const scored of scoredTests) {
    if (selectedTests.length >= count) break;

    if (!usedCategories.has(scored.test.category)) {
      selectedTests.push({
        ...scored,
        reason: generateRecommendationReason(scored, userPreferences)
      });
      usedCategories.add(scored.test.category);
    }
  }

  // 第二輪：如果還不夠，補充高分測驗
  if (selectedTests.length < count) {
    for (const scored of scoredTests) {
      if (selectedTests.length >= count) break;

      if (!selectedTests.find(s => s.test.id === scored.test.id)) {
        selectedTests.push({
          ...scored,
          reason: generateRecommendationReason(scored, userPreferences)
        });
      }
    }
  }

  return selectedTests.slice(0, count);
}

/**
 * 生成推薦理由
 */
function generateRecommendationReason(scoredTest, userPreferences) {
  const { test, breakdown } = scoredTest;

  // 找出最高的分數維度
  const scores = [
    { type: 'preference', value: breakdown.preference, text: '符合你的偏好' },
    { type: 'popularity', value: breakdown.popularity, text: '超人氣測驗' },
    { type: 'diversity', value: breakdown.diversity, text: '探索新領域' },
    { type: 'recency', value: breakdown.recency, text: '好久沒做這類測驗了' }
  ];

  scores.sort((a, b) => b.value - a.value);

  // 新用戶特殊處理
  if (userPreferences.totalTests === 0) {
    return `熱門推薦 · ${test.category}`;
  }

  return scores[0].text + ` · ${test.category}`;
}

/**
 * 獲取推薦統計信息
 */
export function getRecommendationStats() {
  const userPreferences = analyzeUserPreferences();

  return {
    totalTestsDone: userPreferences.totalTests,
    favoriteCategory: Object.entries(userPreferences.categories)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || '尚未測驗',
    availableTests: TEST_DATABASE.length,
    unexploredTests: TEST_DATABASE.length - userPreferences.totalTests
  };
}
