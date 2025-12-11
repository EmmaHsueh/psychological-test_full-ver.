/**
 * 配置文件
 * 存放所有測驗資料和全局配置
 */

// 測驗資料配置
export const TESTS = [
  {
    id: 'test-1',
    url: 'https://41371115h-dot.github.io/fighttest/',
    img: 'https://ppt.cc/ffNPMx@.png',
    label: '後宮甄嬛傳 - 你是哪位娘娘?',
    color: '#8a2b2b'
  },
  {
    id: 'test-2',
    url: 'https://alisonnnnn88.github.io/kpopwebsite/',
    img: 'https://ppt.cc/fX29Yx@.jpg',
    label: '你是哪個K-POP偶像?',
    color: '#d487d4'
  },
  {
    id: 'test-3',
    url: 'https://yuhan222.github.io/animate-test/index.html',
    img: 'https://ppt.cc/f9dWMx',
    label: '動漫人格測驗:你是哪位主角?',
    color: '#e8f1fc'
  },
  {
    id: 'test-4',
    url: 'https://41371122h-lichi.github.io/lichi_funnytest/',
    img: 'https://ppt.cc/fYl1yx@.jpg',
    label: '韓國宮廷漫畫轉生測驗',
    color: '#9e87c4'
  },
  {
    id: 'test-5',
    url: 'https://mirror-psychologicaltest.onrender.com',
    img: 'https://ppt.cc/fj4rtx@.jpg',
    label: '鏡中人格：探索你的另一面',
    color: '#1e4078'
  }
];

// localStorage 鍵名
export const STORAGE_KEY = 'psychTest_history';

// 花瓣動畫配置
export const PETAL_CONFIG = {
  count: 25,
  minSize: 10,
  maxSize: 25,
  minDuration: 8,
  maxDuration: 13,
  minOpacity: 0.3,
  maxOpacity: 0.8
};
