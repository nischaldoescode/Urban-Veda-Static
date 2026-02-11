
// import { Disease, Product, Testimonial } from './types';
// Cloud name	
// djswqd6sd
// API key	
// 416911498741665
// API secret	
// bVo8zHkixfK7QMkEY4lh2Pgef3w

// CLOUDINARY_URL=cloudinary://416911498741665:bVo8zHkixfK7QMkEY4lh2Pgef3w@djswqd6sd

export const DISEASES: Disease[] = [
  {
    id: 'liver-health',
    title: 'Liver Health',
    shortDesc: 'The body\'s primary detoxifier under modern pressure.',
    whyItMatters: 'The liver performs over 500 vital functions, including detoxifying chemicals and metabolizing drugs. It is the engine of your metabolism.',
    modernStressors: 'Processed foods, environmental toxins, and high stress levels lead to fatty liver and sluggish bile production.',
    symptoms: ['Chronic fatigue', 'Digestive issues', 'Skin irritation', 'Poor appetite'],
    ayurvedicView: 'Ayurveda views the liver (Yakrit) as the seat of Pitta (fire). When heat accumulates, the liver becomes overloaded.',
    keyHerbs: [
      { name: 'Amla', description: 'Powerful antioxidant and liver tonic.' },
      { name: 'Aloe Vera', description: 'Cools the liver and aids bile flow.' },
      { name: 'Giloy', description: 'Helps in purifying blood and supporting liver function.' }
    ],
    habits: ['Drink warm water on waking', 'Avoid heavy late-night meals', 'Moderate exercise'],
    relatedProductId: 'liver-detox'
  },
  {
    id: 'diabetes-support',
    title: 'Diabetes Support',
    shortDesc: 'Metabolic balance through natural regulation.',
    whyItMatters: 'Blood sugar regulation is critical for long-term organ health and energy stability.',
    modernStressors: 'Sedentary lifestyle and hidden sugars in "healthy" processed foods disrupt insulin sensitivity.',
    symptoms: ['Frequent thirst', 'Slow healing', 'Energy crashes', 'Blurry vision'],
    ayurvedicView: 'Referred to as Madhumeha, it is often seen as a Kapha imbalance affecting the Medas (fat tissue).',
    keyHerbs: [
      { name: 'Jamun', description: 'Helps convert starch into energy.' },
      { name: 'Karela', description: 'Contains insulin-like compounds.' }
    ],
    habits: ['Consistent meal timings', 'Bitter foods in diet', 'Morning walks'],
    relatedProductId: 'sugar-balance'
  },
  {
    id: 'digestion-care',
    title: 'Digestion & Constipation',
    shortDesc: 'Healing the root of all health.',
    whyItMatters: 'In Ayurveda, "Agni" (digestive fire) is the source of life. Poor digestion leads to toxin buildup (Ama).',
    modernStressors: 'Eating on the go, irregular sleep, and over-processed grains.',
    symptoms: ['Bloating', 'Irregular bowel movements', 'Heavy feeling after meals'],
    ayurvedicView: 'Digestion is the foundation of all seven tissues (Dhatus). If Agni is weak, the whole body suffers.',
    keyHerbs: [
      { name: 'Triphala', description: 'A classic three-fruit formula for colon health.' },
      { name: 'Ginger', description: 'Kindles the digestive fire.' }
    ],
    habits: ['Chew slowly', 'Eat in a calm environment', 'Dinner before 8 PM'],
    relatedProductId: 'digestive-elixir'
  }
];

export const PRODUCTS: Product[] = [
  {
    id: 'liver-detox',
    name: 'Liver Revive',
    purpose: 'Liver detox & metabolic support',
    shortDesc: 'A cooling blend of Amla, Aloe Vera, and Giloy.',
    image: 'https://picsum.photos/seed/liver/600/800',
    longDesc: 'Crafted at home with freshly extracted juices, Liver Revive targets the root cause of metabolic sluggishness.',
    ingredients: [
      { name: 'Fresh Amla', why: 'Vitamin C powerhouse for liver cells.' },
      { name: 'Organic Aloe Vera', why: 'Supports bile production.' }
    ],
    howToConsume: '30ml diluted in 100ml water, twice daily on an empty stomach.',
    whoShouldAvoid: 'Pregnant women or those with chronic kidney disease should consult a doctor.',
    relatedDiseaseId: 'liver-health'
  },
  {
    id: 'sugar-balance',
    name: 'Glyco-Guard',
    purpose: 'Blood sugar & energy stability',
    shortDesc: 'Traditional Jamun and Karela extracts.',
    image: 'https://picsum.photos/seed/sugar/600/800',
    longDesc: 'A potent, bitter-sweet juice designed to support your body\'s natural insulin response.',
    ingredients: [
      { name: 'Wild Jamun', why: 'Glycemic control.' },
      { name: 'Fresh Karela', why: 'Natural insulin support.' }
    ],
    howToConsume: '20ml before breakfast and dinner.',
    whoShouldAvoid: 'Not a substitute for prescribed insulin. Monitor levels closely.',
    relatedDiseaseId: 'diabetes-support'
  },
  {
    id: 'digestive-elixir',
    name: 'Agni-Boost',
    purpose: 'Daily digestion & detox',
    shortDesc: 'Triphala and ginger infused herbal juice.',
    image: 'https://picsum.photos/seed/digest/600/800',
    longDesc: 'Warm your digestive fire and clear morning sluggishness with this time-tested blend.',
    ingredients: [
      { name: 'Triphala', why: 'Gentle detoxification.' },
      { name: 'Sun-dried Ginger', why: 'Stoking the digestive fire.' }
    ],
    howToConsume: '30ml in lukewarm water before bed.',
    whoShouldAvoid: 'Avoid during active diarrhea or severe dehydration.',
    relatedDiseaseId: 'digestion-care'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: '1',
    name: 'Rajesh Sharma',
    age: 45,
    condition: 'Digestive issues',
    text: 'I didn’t expect instant results, but after 3 weeks of Agni-Boost, my digestion improved noticeably. I feel lighter every morning.'
  },
  {
    id: '2',
    name: 'Anjali Nair',
    age: 38,
    condition: 'Fatigue & Skin',
    text: 'The Liver Revive juice has a very natural taste. My skin irritation cleared up after a month of consistent use. Highly recommended.'
  }
];
