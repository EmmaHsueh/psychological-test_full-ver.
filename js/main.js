/**
 * 主程式入口
 * 初始化應用程式並綁定事件處理器
 */

import { TESTS, PETAL_CONFIG } from './config.js';
import { recordTest } from './storage.js';
import { showHistory, backToSelection, clearHistory } from './history.js';
import { showRecommendationPage } from './recommendation.js';

/**
 * 生成花瓣動畫
 */
function createPetals() {
  const container = document.getElementById('petal-container');
  if (!container) return;

  for (let i = 0; i < PETAL_CONFIG.count; i++) {
    const petal = document.createElement('div');
    petal.className = 'petal';

    // 隨機位置
    petal.style.left = Math.random() * 100 + '%';

    // 隨機大小
    const size = Math.random() * (PETAL_CONFIG.maxSize - PETAL_CONFIG.minSize) + PETAL_CONFIG.minSize;
    petal.style.width = size + 'px';
    petal.style.height = size + 'px';

    // 隨機動畫時長
    const duration = Math.random() * (PETAL_CONFIG.maxDuration - PETAL_CONFIG.minDuration) + PETAL_CONFIG.minDuration;
    petal.style.animationDuration = duration + 's';

    // 隨機延遲
    petal.style.animationDelay = Math.random() * 5 + 's';

    // 隨機透明度
    const opacity = Math.random() * (PETAL_CONFIG.maxOpacity - PETAL_CONFIG.minOpacity) + PETAL_CONFIG.minOpacity;
    petal.style.opacity = opacity;

    container.appendChild(petal);
  }
}

/**
 * 顯示測驗聲明彈窗
 */
function showDisclaimer() {
  const modal = document.getElementById('disclaimer-modal');
  if (modal) {
    modal.classList.add('active');
  }
}

/**
 * 開始測驗（進入測驗選擇頁）
 */
function startTests() {
  const homePage = document.getElementById('home-page');
  const modal = document.getElementById('disclaimer-modal');
  const selectionPage = document.getElementById('selection-page');

  if (homePage) homePage.classList.remove('active');
  if (modal) modal.classList.remove('active');
  if (selectionPage) selectionPage.classList.add('active');
}

/**
 * 生成測驗卡片
 */
function generateTestCards() {
  const gallery = document.getElementById('test-gallery');
  if (!gallery) return;

  TESTS.forEach(test => {
    const card = document.createElement('a');
    card.className = 'test-card';
    card.href = test.url;
    card.target = '_blank';
    card.rel = 'noopener noreferrer';
    card.setAttribute('aria-label', test.label);

    // 點擊時記錄測驗
    card.addEventListener('click', () => {
      recordTest(test.id, test.label);
    });

    card.innerHTML = `
      <div class="test-card-accent" style="background-color: ${test.color}"></div>
      <img src="${test.img}" alt="${test.label}">
      <div class="test-card-title">${test.label}</div>
    `;

    gallery.appendChild(card);
  });
}

/**
 * 初始化應用程式
 */
function init() {
  // 生成花瓣動畫
  createPetals();

  // 生成測驗卡片
  generateTestCards();

  // 綁定全局事件（提供給 HTML 使用）
  window.showDisclaimer = showDisclaimer;
  window.startTests = startTests;
  window.showHistory = showHistory;
  window.showRecommendation = showRecommendationPage;
  window.backToSelection = backToSelection;
  window.clearHistory = clearHistory;
}

// DOM 載入完成後初始化
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
