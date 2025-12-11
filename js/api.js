/**
 * API 模組
 * 為未來的 API 整合預留空間
 *
 * 可能的功能：
 * - 每日心理學名言 API
 * - 星座運勢 API
 * - 天氣 API
 * - 用戶資料同步（如使用 Firebase）
 */

/**
 * API 基礎配置
 */
const API_CONFIG = {
  // 未來可在此處添加 API endpoints
  // quotesAPI: 'https://api.quotable.io/random',
  // weatherAPI: 'https://api.openweathermap.org/data/2.5/weather',
  // firebaseConfig: { ... }
};

/**
 * 獲取每日名言（範例）
 * @returns {Promise<Object>} 名言物件
 */
export async function getDailyQuote() {
  try {
    // 範例：使用 Quotable API
    // const response = await fetch('https://api.quotable.io/random?tags=wisdom');
    // const data = await response.json();
    // return {
    //   content: data.content,
    //   author: data.author
    // };

    // 目前返回預設值
    return {
      content: '認識自己是智慧的開端。',
      author: '蘇格拉底'
    };
  } catch (error) {
    console.error('獲取名言失敗:', error);
    return {
      content: '認識自己是智慧的開端。',
      author: '蘇格拉底'
    };
  }
}

/**
 * 獲取天氣資訊（範例）
 * @param {string} city - 城市名稱
 * @returns {Promise<Object>} 天氣物件
 */
export async function getWeather(city = 'Taipei') {
  try {
    // 未來可在此處整合天氣 API
    // const apiKey = 'YOUR_API_KEY';
    // const response = await fetch(
    //   `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_tw`
    // );
    // const data = await response.json();
    // return data;

    // 目前返回預設值
    return {
      temp: 25,
      description: '晴朗'
    };
  } catch (error) {
    console.error('獲取天氣失敗:', error);
    return null;
  }
}

/**
 * 上傳測驗結果到雲端（範例）
 * @param {Object} testResult - 測驗結果物件
 * @returns {Promise<boolean>} 是否成功
 */
export async function syncTestResult(testResult) {
  try {
    // 未來可在此處整合 Firebase 或其他後端服務
    // await firebase.firestore()
    //   .collection('testResults')
    //   .add(testResult);

    console.log('測驗結果準備同步:', testResult);
    return true;
  } catch (error) {
    console.error('同步失敗:', error);
    return false;
  }
}

/**
 * 取得推薦測驗（範例）
 * @param {Array} completedTests - 已完成的測驗 ID 列表
 * @returns {Promise<Array>} 推薦的測驗列表
 */
export async function getRecommendedTests(completedTests) {
  try {
    // 未來可在此處整合推薦演算法 API
    // const response = await fetch('/api/recommendations', {
    //   method: 'POST',
    //   body: JSON.stringify({ completedTests })
    // });
    // const data = await response.json();
    // return data.recommendations;

    console.log('已完成測驗:', completedTests);
    return [];
  } catch (error) {
    console.error('獲取推薦失敗:', error);
    return [];
  }
}

export default API_CONFIG;
