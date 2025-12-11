/**
 * 圖表管理模組
 * 使用 Chart.js 生成統計圖表
 */

import { TESTS } from './config.js';

// 儲存圖表實例
let chartInstance = null;

/**
 * 生成統計圖表
 * @param {Object} testCounts - 測驗次數統計物件 {測驗名稱: 次數}
 */
export function generateChart(testCounts) {
  const ctx = document.getElementById('testChart');

  if (!ctx) {
    console.error('找不到圖表 canvas 元素');
    return;
  }

  // 銷毀舊圖表
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }

  // 準備圖表資料
  const labels = Object.keys(testCounts);
  const data = Object.values(testCounts);
  const colors = labels.map(label => {
    const test = TESTS.find(t => t.label === label);
    return test ? test.color : '#999';
  });

  // 如果沒有資料，隱藏圖表
  if (labels.length === 0) {
    ctx.style.display = 'none';
    return;
  }

  ctx.style.display = 'block';

  // 建立新圖表
  chartInstance = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: labels.map(label =>
        label.length > 20 ? label.substring(0, 20) + '...' : label
      ),
      datasets: [{
        label: '完成次數',
        data: data,
        backgroundColor: colors.map(color => color + 'CC'), // 添加透明度
        borderColor: colors,
        borderWidth: 2,
        borderRadius: 8,
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 1,
            font: {
              size: 12
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          ticks: {
            font: {
              size: 11
            }
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}

/**
 * 銷毀圖表實例
 */
export function destroyChart() {
  if (chartInstance) {
    chartInstance.destroy();
    chartInstance = null;
  }
}
