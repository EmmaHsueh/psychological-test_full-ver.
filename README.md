# 心理測驗網站

一個互動式心理測驗平台，提供五種不同主題的心理測驗，並具備完整的歷史記錄和統計圖表功能。

## 📁 專案結構

```
psychological-test_full-ver/
├── index.html              # 主頁面
├── css/
│   └── styles.css         # 所有樣式表
├── js/
│   ├── config.js          # 配置文件（測驗資料、常數）
│   ├── storage.js         # localStorage 管理
│   ├── chartManager.js    # Chart.js 圖表生成
│   ├── history.js         # 歷史記錄頁面邏輯
│   ├── api.js             # API 整合模組（預留）
│   └── main.js            # 主程式入口
└── README.md              # 專案說明文件
```

## 🎯 功能特色

### 1. 測驗功能
- 五種不同主題的心理測驗
- 響應式卡片設計
- 流暢的動畫效果
- 花瓣飄落背景動畫

### 2. 歷史記錄
- 自動記錄每次測驗
- localStorage 永久儲存
- 統計數據卡片：
  - 測驗總次數
  - 完成測驗種類
  - 最愛測驗
- Chart.js 視覺化圖表
- 完整的測驗記錄列表

### 3. 技術特點
- ES6 模組化設計
- 關注點分離
- 易於維護和擴展
- 預留 API 整合接口

## 🚀 使用方式

### 本地開啟

由於使用了 ES6 模組，需要透過本地伺服器運行：

```bash
# 使用 Python 3
python3 -m http.server 8000

# 或使用 Python 2
python -m SimpleHTTPServer 8000

# 或使用 Node.js (需先安裝 http-server)
npx http-server
```

然後在瀏覽器開啟 `http://localhost:8000`

### 部署到 GitHub Pages

1. 將專案推送到 GitHub 儲存庫
2. 在 Settings > Pages 中啟用 GitHub Pages
3. 選擇 main 分支作為來源

## 📦 模組說明

### config.js
存放所有配置資料：
- `TESTS`: 測驗資料陣列
- `STORAGE_KEY`: localStorage 鍵名
- `PETAL_CONFIG`: 花瓣動畫配置

### storage.js
處理資料持久化：
- `getHistory()`: 獲取歷史記錄
- `saveHistory()`: 儲存歷史記錄
- `recordTest()`: 記錄新測驗
- `clearAllHistory()`: 清除所有記錄
- `calculateStats()`: 計算統計數據

### chartManager.js
圖表生成與管理：
- `generateChart()`: 生成 Chart.js 圖表
- `destroyChart()`: 銷毀圖表實例

### history.js
歷史記錄頁面邏輯：
- `loadHistoryPage()`: 載入歷史記錄頁
- `showHistory()`: 顯示歷史記錄頁
- `backToSelection()`: 返回測驗選擇頁
- `clearHistory()`: 清除記錄（帶確認）

### api.js
預留 API 整合接口：
- `getDailyQuote()`: 獲取每日名言（範例）
- `getWeather()`: 獲取天氣資訊（範例）
- `syncTestResult()`: 同步測驗結果（範例）
- `getRecommendedTests()`: 獲取推薦測驗（範例）

### main.js
應用程式主入口：
- 初始化所有功能
- 生成測驗卡片
- 綁定事件處理器

## 🔧 未來擴展建議

### 1. API 整合
在 `api.js` 中整合外部 API：
```javascript
// 範例：整合每日名言 API
export async function getDailyQuote() {
  const response = await fetch('https://api.quotable.io/random');
  const data = await response.json();
  return data;
}
```

### 2. 後端整合
使用 Firebase 或其他 Backend-as-a-Service：
- 用戶認證
- 雲端資料同步
- 社群功能（評論、分享）

### 3. 新增功能
- 深色模式切換
- 測驗推薦演算法
- 成就系統
- 社交分享
- PWA 支援

## 📝 測驗資料格式

在 `config.js` 中的測驗資料格式：

```javascript
{
  id: 'test-1',              // 唯一識別碼
  url: 'https://...',        // 測驗連結
  img: 'https://...',        // 測驗封面圖片
  label: '測驗名稱',          // 顯示名稱
  color: '#8a2b2b'           // 主題色彩
}
```

## 🎨 樣式自訂

所有樣式都在 `css/styles.css` 中，使用 CSS 變數定義主題色：

```css
:root {
  --color-1: #8a2b2b; /* 後宮甄嬛傳 */
  --color-2: #d487d4; /* K-POP */
  --color-3: #e8f1fc; /* 動漫人格 */
  --color-4: #9e87c4; /* 韓國宮廷漫畫 */
  --color-5: #1e4078; /* 鏡中人格 */
}
```

## 📱 響應式設計

支援三種螢幕尺寸：
- 桌面版：1200px+
- 平板版：900px - 1199px
- 手機版：520px - 899px

## 🔒 資料安全

- 所有資料儲存在用戶本地的 localStorage
- 不會上傳到伺服器
- 用戶可隨時清除記錄

