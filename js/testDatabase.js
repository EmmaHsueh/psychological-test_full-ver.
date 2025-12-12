/**
 * 心理測驗數據庫
 * 包含從網路資源整理的各類心理測驗
 *
 * 數據來源：
 * - 16Personalities (MBTI)
 * - Truity
 * - Arealme
 * - 其他知名心理測驗網站
 */

export const TEST_DATABASE = [
  // === 人格分析類 ===
  {
    id: 'ext-mbti-1',
    url: 'https://www.16personalities.com/ch/free-personality-test',
    img: 'https://images.unsplash.com/photo-1516302752625-fcc3c50ae61f?w=500&h=700&fit=crop',
    label: 'MBTI 16型人格測驗',
    description: '全球最受歡迎的人格測驗，探索你的性格類型與天賦',
    category: '人格分析',
    tags: ['MBTI', '性格', '職涯', '自我認識'],
    difficulty: 'medium',
    duration: 12,
    popularity: 98,
    color: '#88b04b'
  },
  {
    id: 'ext-enneagram-1',
    url: 'https://www.eclecticenergies.com/zh-TW/enneagram/test',
    img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop',
    label: '九型人格測驗',
    description: '發現你的核心動機、恐懼與人際關係模式',
    category: '人格分析',
    tags: ['九型', '動機', '人際關係', '自我成長'],
    difficulty: 'hard',
    duration: 15,
    popularity: 85,
    color: '#6b5b95'
  },
  {
    id: 'ext-bigfive-1',
    url: 'https://www.truity.com/test/big-five-personality-test',
    img: 'https://images.unsplash.com/photo-1509909756405-be0199881695?w=500&h=700&fit=crop',
    label: '大五人格特質測驗',
    description: '基於科學研究的五大性格維度分析',
    category: '科學測驗',
    tags: ['科學', '心理學', '性格分析', '研究'],
    difficulty: 'medium',
    duration: 10,
    popularity: 78,
    color: '#f7cac9'
  },
  {
    id: 'ext-disc-1',
    url: 'https://www.eclecticenergies.com/zh-TW/disc/test',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=500&h=700&fit=crop',
    label: 'DISC 行為風格測驗',
    description: '了解你的溝通風格與工作行為模式',
    category: '行為分析',
    tags: ['DISC', '溝通', '團隊合作', '領導力'],
    difficulty: 'easy',
    duration: 8,
    popularity: 72,
    color: '#955251'
  },

  // === 職涯發展類 ===
  {
    id: 'ext-career-1',
    url: 'https://www.truity.com/test/type-finder-personality-test-new',
    img: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=500&h=700&fit=crop',
    label: '職業性格測驗',
    description: '找出最適合你的職業方向與工作環境',
    category: '職涯發展',
    tags: ['職業', '生涯規劃', '工作', '天賦'],
    difficulty: 'medium',
    duration: 12,
    popularity: 88,
    color: '#92a8d1'
  },
  {
    id: 'ext-strengths-1',
    url: 'https://high5test.com/test/',
    img: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=500&h=700&fit=crop',
    label: 'HIGH5 優勢測驗',
    description: '發現你的前5大優勢，活出最好的自己',
    category: '職涯發展',
    tags: ['優勢', '天賦', '成就', '發展'],
    difficulty: 'easy',
    duration: 10,
    popularity: 75,
    color: '#009b77'
  },

  // === 情緒智商類 ===
  {
    id: 'ext-eq-1',
    url: 'https://www.truity.com/test/emotional-intelligence-test',
    img: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=500&h=700&fit=crop',
    label: '情緒智商測驗',
    description: '評估你的情緒管理與人際敏感度',
    category: '情緒智商',
    tags: ['EQ', '情緒', '同理心', '人際關係'],
    difficulty: 'medium',
    duration: 10,
    popularity: 82,
    color: '#5b5ea6'
  },
  {
    id: 'ext-empathy-1',
    url: 'https://www.arealme.com/empathy-quotient/zh/',
    img: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=500&h=700&fit=crop',
    label: '同理心測驗',
    description: '測量你感知他人情緒的能力',
    category: '情緒智商',
    tags: ['同理心', '感知', '情感', '關懷'],
    difficulty: 'easy',
    duration: 8,
    popularity: 68,
    color: '#dd4124'
  },

  // === 思維模式類 ===
  {
    id: 'ext-brain-1',
    url: 'https://www.arealme.com/left-right-brain/zh/',
    img: 'https://images.unsplash.com/photo-1559757175-5700dde675bc?w=500&h=700&fit=crop',
    label: '左右腦優勢測驗',
    description: '測試你是邏輯型還是創意型思考者',
    category: '思維模式',
    tags: ['左右腦', '邏輯', '創意', '思考'],
    difficulty: 'easy',
    duration: 5,
    popularity: 90,
    color: '#45b8ac'
  },
  {
    id: 'ext-learning-1',
    url: 'https://www.howtolearn.com/learning-styles-quiz/',
    img: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=500&h=700&fit=crop',
    label: '學習風格測驗',
    description: '發現你最有效的學習方式',
    category: '思維模式',
    tags: ['學習', '教育', '吸收', '成長'],
    difficulty: 'easy',
    duration: 7,
    popularity: 73,
    color: '#98b4d4'
  },
  {
    id: 'ext-creativity-1',
    url: 'https://www.arealme.com/creativity-test/zh/',
    img: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=500&h=700&fit=crop',
    label: '創造力測驗',
    description: '評估你的創新思維與想像力',
    category: '思維模式',
    tags: ['創造力', '創新', '想像', '藝術'],
    difficulty: 'medium',
    duration: 10,
    popularity: 71,
    color: '#b565a7'
  },

  // === 戀愛關係類 ===
  {
    id: 'ext-love-1',
    url: 'https://www.truity.com/test/love-styles-test',
    img: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=500&h=700&fit=crop',
    label: '愛情風格測驗',
    description: '了解你在戀愛關係中的行為模式',
    category: '戀愛關係',
    tags: ['愛情', '戀愛', '關係', '伴侶'],
    difficulty: 'medium',
    duration: 10,
    popularity: 86,
    color: '#d65076'
  },
  {
    id: 'ext-attachment-1',
    url: 'https://www.arealme.com/attachment-style-test/zh/',
    img: 'https://images.unsplash.com/photo-1474552226712-ac0f0961a954?w=500&h=700&fit=crop',
    label: '依附風格測驗',
    description: '探索你在親密關係中的依附類型',
    category: '戀愛關係',
    tags: ['依附', '親密關係', '安全感', '心理'],
    difficulty: 'medium',
    duration: 12,
    popularity: 79,
    color: '#e94b3c'
  },

  // === 趣味娛樂類 ===
  {
    id: 'ext-color-1',
    url: 'https://www.arealme.com/color-psychology/zh/',
    img: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=500&h=700&fit=crop',
    label: '色彩心理學測驗',
    description: '透過顏色偏好了解你的潛在性格',
    category: '趣味娛樂',
    tags: ['色彩', '視覺', '潛意識', '有趣'],
    difficulty: 'easy',
    duration: 5,
    popularity: 92,
    color: '#f0c05a'
  },
  {
    id: 'ext-iq-1',
    url: 'https://www.arealme.com/iq/zh/',
    img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=500&h=700&fit=crop',
    label: '智商測驗',
    description: '測試你的邏輯推理與問題解決能力',
    category: '趣味娛樂',
    tags: ['IQ', '智力', '邏輯', '推理'],
    difficulty: 'hard',
    duration: 20,
    popularity: 95,
    color: '#5f4b8b'
  },
  {
    id: 'ext-memory-1',
    url: 'https://www.arealme.com/memory/zh/',
    img: 'https://images.unsplash.com/photo-1472162072942-cd5147eb3902?w=500&h=700&fit=crop',
    label: '記憶力測驗',
    description: '挑戰你的短期記憶與專注力',
    category: '趣味娛樂',
    tags: ['記憶', '專注', '大腦', '挑戰'],
    difficulty: 'medium',
    duration: 8,
    popularity: 77,
    color: '#fa7a35'
  },

  // === 心理健康類 ===
  {
    id: 'ext-stress-1',
    url: 'https://www.arealme.com/stress-test/zh/',
    img: 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=500&h=700&fit=crop',
    label: '壓力程度測驗',
    description: '評估你目前的壓力水平與應對能力',
    category: '心理健康',
    tags: ['壓力', '健康', '放鬆', '調適'],
    difficulty: 'easy',
    duration: 6,
    popularity: 81,
    color: '#bc243c'
  },
  {
    id: 'ext-anxiety-1',
    url: 'https://www.arealme.com/social-anxiety-test/zh/',
    img: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=500&h=700&fit=crop',
    label: '社交焦慮測驗',
    description: '了解你在社交場合的舒適程度',
    category: '心理健康',
    tags: ['焦慮', '社交', '心理', '自我認識'],
    difficulty: 'medium',
    duration: 8,
    popularity: 74,
    color: '#618685'
  },
  {
    id: 'ext-happiness-1',
    url: 'https://www.arealme.com/happiness-test/zh/',
    img: 'https://images.unsplash.com/photo-1506126279646-a697353d3166?w=500&h=700&fit=crop',
    label: '幸福指數測驗',
    description: '測量你的生活滿意度與幸福感',
    category: '心理健康',
    tags: ['幸福', '快樂', '滿足', '生活'],
    difficulty: 'easy',
    duration: 7,
    popularity: 83,
    color: '#e9897e'
  },

  // === 價值觀與性格類 ===
  {
    id: 'ext-values-1',
    url: 'https://www.valuescentre.com/our-products/products-individuals/personal-values-assessment-pva/',
    img: 'https://images.unsplash.com/photo-1495001258031-d1b407bc1776?w=500&h=700&fit=crop',
    label: '核心價值觀測驗',
    description: '發現驅動你人生決策的核心價值',
    category: '價值觀',
    tags: ['價值觀', '信念', '人生', '決策'],
    difficulty: 'medium',
    duration: 15,
    popularity: 70,
    color: '#5a7247'
  },
  {
    id: 'ext-moral-1',
    url: 'https://www.arealme.com/moral-alignment/zh/',
    img: 'https://images.unsplash.com/photo-1533093818801-e9eb1c9c2095?w=500&h=700&fit=crop',
    label: '道德陣營測驗',
    description: '基於龍與地下城系統的道德立場分析',
    category: '價值觀',
    tags: ['道德', '倫理', '正義', '立場'],
    difficulty: 'easy',
    duration: 10,
    popularity: 76,
    color: '#6c5353'
  }
];

/**
 * 測驗類別配置
 */
export const CATEGORIES = [
  { id: 'personality', name: '人格分析', icon: '👤', color: '#88b04b' },
  { id: 'career', name: '職涯發展', icon: '💼', color: '#92a8d1' },
  { id: 'eq', name: '情緒智商', icon: '❤️', color: '#5b5ea6' },
  { id: 'thinking', name: '思維模式', icon: '🧠', color: '#45b8ac' },
  { id: 'love', name: '戀愛關係', icon: '💕', color: '#d65076' },
  { id: 'fun', name: '趣味娛樂', icon: '🎮', color: '#f0c05a' },
  { id: 'health', name: '心理健康', icon: '🌿', color: '#618685' },
  { id: 'values', name: '價值觀', icon: '⭐', color: '#5a7247' }
];

/**
 * 獲取所有測驗
 */
export function getAllTests() {
  return TEST_DATABASE;
}

/**
 * 根據ID獲取測驗
 */
export function getTestById(id) {
  return TEST_DATABASE.find(test => test.id === id);
}

/**
 * 根據類別獲取測驗
 */
export function getTestsByCategory(category) {
  return TEST_DATABASE.filter(test => test.category === category);
}

/**
 * 根據標籤獲取測驗
 */
export function getTestsByTag(tag) {
  return TEST_DATABASE.filter(test => test.tags.includes(tag));
}

/**
 * 搜尋測驗
 */
export function searchTests(keyword) {
  const lowerKeyword = keyword.toLowerCase();
  return TEST_DATABASE.filter(test =>
    test.label.toLowerCase().includes(lowerKeyword) ||
    test.description.toLowerCase().includes(lowerKeyword) ||
    test.tags.some(tag => tag.toLowerCase().includes(lowerKeyword))
  );
}
