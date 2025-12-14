/**
 * 歷史記錄頁面管理模組
 * 處理歷史記錄頁面的顯示和互動
 */

import { getHistory, calculateStats, clearAllHistory } from './storage.js';
import { generateChart } from './chartManager.js';

/**
 * 載入並顯示歷史記錄頁面
 */
export function loadHistoryPage() {
  const history = getHistory();
  const stats = calculateStats(history);

  // 更新統計卡片
  updateStatsCards(stats);

  // 生成圖表
  generateChart(stats.testCounts);

  // 生成歷史記錄列表
  generateHistoryList(history);
}

/**
 * 更新統計卡片
 * @param {Object} stats - 統計數據
 */
function updateStatsCards(stats) {
  const totalTestsEl = document.getElementById('total-tests');
  const uniqueTestsEl = document.getElementById('unique-tests');
  const favoriteTestEl = document.getElementById('favorite-test');

  if (totalTestsEl) {
    totalTestsEl.textContent = stats.totalTests;
  }

  if (uniqueTestsEl) {
    uniqueTestsEl.textContent = stats.uniqueTests;
  }

  if (favoriteTestEl) {
    const displayText = stats.favoriteTest.length > 15
      ? stats.favoriteTest.substring(0, 15) + '...'
      : stats.favoriteTest;
    favoriteTestEl.textContent = displayText;
    favoriteTestEl.title = stats.favoriteTest; // 完整名稱顯示在 tooltip
  }
}

/**
 * 生成歷史記錄列表
 * @param {Array} history - 歷史記錄陣列
 */
function generateHistoryList(history) {
  const listContainer = document.getElementById('history-list');

  if (!listContainer) {
    console.error('找不到歷史記錄列表容器');
    return;
  }

  listContainer.innerHTML = '';

  // 如果沒有記錄，顯示空狀態
  if (history.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-state">
        <p>尚無測驗記錄</p>
        <p style="font-size: 14px; color: #999;">開始你的第一個心理測驗吧！</p>
      </div>
    `;
    return;
  }

  // 生成每一筆記錄
  history.forEach(record => {
    const item = document.createElement('div');
    item.className = 'history-item';

    const date = new Date(record.timestamp);
    const timeString = date.toLocaleString('zh-TW', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });

    item.innerHTML = `
      <div class="test-name">${record.testLabel}</div>
      <div class="test-time">完成時間：${timeString}</div>
    `;

    listContainer.appendChild(item);
  });
}

/**
 * 清除歷史記錄（帶確認）
 */
export function clearHistory() {
  if (confirm('確定要清除所有測驗記錄嗎？此操作無法復原。')) {
    const success = clearAllHistory();
    if (success) {
      loadHistoryPage(); // 重新載入頁面
    } else {
      alert('清除失敗，請稍後再試。');
    }
  }
}

/**
 * 顯示歷史記錄頁面
 */
export function showHistory() {
  // 隱藏所有頁面
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // 顯示歷史記錄頁面
  const historyPage = document.getElementById('history-page');
  if (historyPage) historyPage.classList.add('active');

  loadHistoryPage();
}

/**
 * 返回測驗選擇頁面
 */
export function backToSelection() {
  // 隱藏所有頁面
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });

  // 顯示測驗選擇頁面
  const selectionPage = document.getElementById('selection-page');
  if (selectionPage) selectionPage.classList.add('active');
}
