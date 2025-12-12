/**
 * 推薦頁面管理模組
 */

import { getDailyRecommendedTest, getMultipleRecommendations } from './api.js';
import { getRecommendationStats } from './recommendationEngine.js';
import { recordTest } from './storage.js';

/**
 * 載入推薦頁面
 */
export async function loadRecommendationPage() {
  try {
    // 載入每日推薦
    await loadDailyRecommendation();

    // 載入更多推薦
    await loadMoreRecommendations();

    // 載入統計信息
    loadRecommendationStats();
  } catch (error) {
    console.error('載入推薦頁面失敗:', error);
    showError('載入失敗，請稍後再試');
  }
}

/**
 * 載入每日推薦測驗
 */
async function loadDailyRecommendation() {
  const container = document.getElementById('daily-recommendation-card');

  try {
    const response = await getDailyRecommendedTest();

    if (!response.success) {
      throw new Error(response.error);
    }

    const { test, reason } = response.data;

    // 生成每日推薦卡片HTML
    container.innerHTML = `
      <div class="daily-test-card" style="background: linear-gradient(135deg, ${test.color}dd, ${test.color}55);">
        <div class="daily-test-badge">今日精選</div>
        <div class="daily-test-image" style="background-image: url('${test.img}')"></div>
        <div class="daily-test-content">
          <h3>${test.label}</h3>
          <p class="daily-test-description">${test.description}</p>
          <div class="daily-test-meta">
            <span class="category-tag">${test.category}</span>
            <span class="duration-tag">約 ${test.duration} 分鐘</span>
          </div>
          <p class="recommendation-reason">
            <img src="icons/trending-up.svg" class="reason-icon" alt="reason"> ${reason}
          </p>
          <button class="start-daily-test-btn" data-test-id="${test.id}" data-test-label="${test.label}" data-test-url="${test.url}">
            開始測驗
          </button>
        </div>
      </div>
    `;

    // 綁定按鈕事件
    const btn = container.querySelector('.start-daily-test-btn');
    btn.addEventListener('click', () => {
      recordTest(test.id, test.label);
      window.open(test.url, '_blank');
    });

  } catch (error) {
    console.error('載入每日推薦失敗:', error);
    container.innerHTML = `
      <div class="error-message">
        <p>載入推薦失敗，請重新整理頁面</p>
      </div>
    `;
  }
}

/**
 * 載入更多推薦測驗
 */
async function loadMoreRecommendations() {
  const container = document.getElementById('more-recommendations-grid');

  try {
    const response = await getMultipleRecommendations(6);

    if (!response.success || response.data.length === 0) {
      throw new Error(response.error || '沒有推薦測驗');
    }

    const recommendations = response.data;

    // 生成推薦卡片HTML
    container.innerHTML = recommendations.map(({ test, reason }) => `
      <div class="recommendation-card">
        <div class="rec-card-image" style="background-image: url('${test.img}')">
          <div class="rec-card-overlay"></div>
        </div>
        <div class="rec-card-content">
          <h4>${test.label}</h4>
          <p class="rec-card-desc">${test.description}</p>
          <div class="rec-card-meta">
            <span class="category-badge" style="background-color: ${test.color}33; color: ${test.color};">
              ${test.category}
            </span>
            <span class="duration-badge">${test.duration}分</span>
          </div>
          <p class="rec-reason">${reason}</p>
          <button class="rec-test-btn" data-test-id="${test.id}" data-test-label="${test.label}" data-test-url="${test.url}">
            開始測驗
          </button>
        </div>
      </div>
    `).join('');

    // 綁定所有按鈕事件
    container.querySelectorAll('.rec-test-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const testId = btn.dataset.testId;
        const testLabel = btn.dataset.testLabel;
        const testUrl = btn.dataset.testUrl;

        recordTest(testId, testLabel);
        window.open(testUrl, '_blank');
      });
    });

  } catch (error) {
    console.error('載入更多推薦失敗:', error);
    container.innerHTML = `
      <div class="error-message">
        <p>載入推薦列表失敗</p>
      </div>
    `;
  }
}

/**
 * 載入推薦統計信息
 */
function loadRecommendationStats() {
  try {
    const stats = getRecommendationStats();

    document.getElementById('completed-count').textContent = stats.totalTestsDone;
    document.getElementById('favorite-category').textContent = stats.favoriteCategory;
    document.getElementById('available-count').textContent = stats.unexploredTests;
  } catch (error) {
    console.error('載入統計信息失敗:', error);
  }
}

/**
 * 顯示錯誤信息
 */
function showError(message) {
  const dailyCard = document.getElementById('daily-recommendation-card');
  const moreGrid = document.getElementById('more-recommendations-grid');

  const errorHTML = `
    <div class="error-message">
      <p>${message}</p>
    </div>
  `;

  if (dailyCard) dailyCard.innerHTML = errorHTML;
  if (moreGrid) moreGrid.innerHTML = errorHTML;
}

/**
 * 顯示推薦頁面
 */
export function showRecommendationPage() {
  // 隱藏其他頁面
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // 顯示推薦頁面
  const recommendationPage = document.getElementById('recommendation-page');
  recommendationPage.classList.add('active');

  // 載入推薦內容
  loadRecommendationPage();
}
