/**
 * localStorage 管理模組
 * 處理所有測驗歷史記錄的儲存和讀取
 */

import { STORAGE_KEY } from './config.js';

/**
 * 獲取所有歷史記錄
 * @returns {Array} 歷史記錄陣列
 */
export function getHistory() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('讀取歷史記錄失敗:', error);
    return [];
  }
}

/**
 * 儲存歷史記錄
 * @param {Array} history - 歷史記錄陣列
 */
export function saveHistory(history) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('儲存歷史記錄失敗:', error);
  }
}

/**
 * 記錄新的測驗
 * @param {string} testId - 測驗 ID
 * @param {string} testLabel - 測驗名稱
 */
export function recordTest(testId, testLabel) {
  const history = getHistory();
  const record = {
    testId,
    testLabel,
    timestamp: new Date().toISOString()
  };
  history.unshift(record); // 新記錄放在最前面
  saveHistory(history);
}

/**
 * 清除所有歷史記錄
 */
export function clearAllHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (error) {
    console.error('清除歷史記錄失敗:', error);
    return false;
  }
}

/**
 * 計算統計數據
 * @param {Array} history - 歷史記錄陣列
 * @returns {Object} 統計數據物件
 */
export function calculateStats(history) {
  // 定義五個心理測驗的 ID
  const validTestIds = ['test-1', 'test-2', 'test-3', 'test-4', 'test-5'];

  // 只保留這五個測驗的記錄
  const filteredHistory = history.filter(record =>
    validTestIds.includes(record.testId)
  );

  const totalTests = filteredHistory.length;
  const uniqueTests = new Set(filteredHistory.map(record => record.testId)).size;

  // 計算每個測驗的次數
  const testCounts = {};
  filteredHistory.forEach(record => {
    testCounts[record.testLabel] = (testCounts[record.testLabel] || 0) + 1;
  });

  // 找出最愛測驗
  let favoriteTest = '-';
  let maxCount = 0;
  for (const [label, count] of Object.entries(testCounts)) {
    if (count > maxCount) {
      maxCount = count;
      favoriteTest = label;
    }
  }

  return {
    totalTests,
    uniqueTests,
    favoriteTest,
    testCounts
  };
}
