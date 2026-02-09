
export interface Juice {
  id: string;
  name: string;
  ingredients: string;
  benefits: string;
  description: string;
  image: string;
  orderLink: string;
  isPopular?: boolean;
}

export interface SiteConfig {
  logoName: string;
  heroHeadline: string;
  heroSubtext: string;
  whatsappLink: string;
  announcement: string;
  metaDescription: string;
  metaKeywords: string;
}

export interface AppState {
  juices: Juice[];
  config: SiteConfig;
}

// Interfaces for Health Awareness section
export interface Herb {
  name: string;
  description: string;
}

export interface Disease {
  id: string;
  title: string;
  shortDesc: string;
  whyItMatters: string;
  modernStressors: string;
  symptoms: string[];
  ayurvedicView: string;
  keyHerbs: Herb[];
  habits: string[];
  relatedProductId: string;
}

export interface ProductIngredient {
  name: string;
  why: string;
}

export interface Product {
  id: string;
  name: string;
  purpose: string;
  shortDesc: string;
  image: string;
  longDesc: string;
  ingredients: ProductIngredient[];
  howToConsume: string;
  whoShouldAvoid: string;
  relatedDiseaseId: string;
}

export interface Testimonial {
  id: string;
  name: string;
  age?: number;
  condition: string;
  text: string;
}
