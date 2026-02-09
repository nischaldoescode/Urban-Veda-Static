
import { AppState, Juice, SiteConfig } from './types';

// Updated with your specific product data
const DEFAULT_JUICES: Juice[] = [
  {
    id: 'ayuboost',
    name: 'Ayuboost',
    ingredients: 'Amla, Aloe Vera, Moringa, Giloy, Arjun Chaal, Ginger, Haldi (Turmeric), Curry Leaves, Mint (Pudina), Paan (Betel Leaf), Cucumber',
    benefits: 'Boosts immunity, aids digestion, naturally detoxifies, supports heart function.',
    description: 'Our signature blend designed for daily wellness. Freshly cold-pressed every morning. High in antioxidants, reduces chronic health risks, and acts as a natural alkaliser for gut health.',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=800',
    orderLink: 'https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M',
    isPopular: true
  },
  {
    id: 'diabetes-care',
    name: 'Diabetes Care',
    ingredients: 'Amla, Aloe Vera, Moringa, Giloy, Arjun Chaal, Ginger, Haldi, Curry Leaves, Mint, Paan, Cucumber, Karela (Bitter Gourd), Gudmar, Jamun, Neem',
    benefits: 'Effective for controlling diabetes and blood purification.',
    description: 'Our most potent formula. Includes all the benefits of Ayuboost PLUS specialized herbs like Karela and Gudmar for blood sugar management and deep blood purification.',
    image: 'https://images.unsplash.com/photo-1544145945-f904253db0ad?auto=format&fit=crop&q=80&w=800',
    orderLink: 'https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M'
  }
];

const DEFAULT_CONFIG: SiteConfig = {
  logoName: 'Urban Veda',
  heroHeadline: 'Modern Life. Ancient Wisdom.',
  heroSubtext: 'Understanding lifestyle diseases through Ayurveda. Freshly cold-pressed herbal juices delivered daily to Sobha City residents.',
  whatsappLink: 'https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M',
  announcement: '🌿 Free trial pack available for Sobha City residents this week!',
  metaDescription: 'Urban Veda offers 100% natural, preservative-free herbal juices. Ancient Ayurvedic wisdom for modern lifestyle health.',
  metaKeywords: 'ayurveda, herbal juice, detox, sobha city, health, immunity, diabetes care, amla juice'
};

const STORAGE_KEY = 'urban_veda_state_v2';

export const getAppState = (): AppState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return { juices: DEFAULT_JUICES, config: DEFAULT_CONFIG };
};

export const saveAppState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  // Dispatch custom event so other components update immediately
  window.dispatchEvent(new Event('app_state_updated'));
};
