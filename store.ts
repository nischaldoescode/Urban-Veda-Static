
import { AppState, Juice, SiteConfig } from './types';

const DEFAULT_JUICES: Juice[] = [
  {
    id: 'ayuboost',
    name: 'Ayuboost',
    ingredients: 'Amla, Aloe Vera, Moringa, Giloy, Paan, Ginger',
    benefits: 'Immunity & Vitality',
    description: 'Our signature blend designed for daily wellness. Freshly cold-pressed every morning. High in antioxidants, reduces chronic health risks.',
    image: 'https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&q=80&w=800',
    orderLink: 'https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M',
    isPopular: true
  },
  {
    id: 'diabetes-care',
    name: 'Diabetes Care',
    ingredients: 'Karela, Jamun, Neem, Amla, Giloy',
    benefits: 'Blood Sugar Management',
    description: 'Our most potent formula. Includes specialized herbs like Karela and Gudmar for blood sugar management and deep blood purification.',
    image: 'https://images.unsplash.com/photo-1544145945-f904253db0ad?auto=format&fit=crop&q=80&w=800',
    orderLink: 'https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M'
  }
];

const DEFAULT_CONFIG: SiteConfig = {
  logoName: 'Urban Veda',
  heroHeadline: 'Modern Life. Ancient Wisdom.',
  heroSubtext: 'Freshly cold-pressed herbal juices delivered daily to your doorstep. Understanding lifestyle diseases through Ayurveda.',
  whatsappLink: 'https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M',
  announcement: '🌿 Trial packs now available for new residents!',
  metaDescription: 'Urban Veda - Premium Herbal Juices crafted for modern professionals.',
  metaKeywords: 'ayurveda, herbal juice, detox, health',
  
  aboutPage: {
    headline: 'The Urban Veda Story',
    subtext: 'Urban Veda started in a small home kitchen in Bangalore. We realized that most "solutions" were just pills. We decided to bridge the gap between ancient health rituals and modern schedules.',
    image: 'https://images.unsplash.com/photo-1543332164-6e82f355badc?auto=format&fit=crop&q=80&w=1200',
    extraText: 'We focus on small batches, fresh extraction, and total transparency.'
  },
  
  philosophyPage: {
    headline: 'Honesty is our Main Ingredient',
    subtext: 'Consistency over miracle claims. Roots over quick fixes. We believe health is not a product you buy, but a ritual you maintain.',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=1200',
    extraText: 'No mass production. No preservatives. Pure extracts.'
  },
  
  testimonialsHeader: {
    title: 'Real Experiences',
    subtitle: 'Grounded stories from our consistent users.'
  }
};

const STORAGE_KEY = 'urban_veda_v3_store';

export const getAppState = (): AppState => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) return JSON.parse(stored);
  return { juices: DEFAULT_JUICES, config: DEFAULT_CONFIG };
};

export const saveAppState = (state: AppState) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  window.dispatchEvent(new Event('app_state_updated'));
};
