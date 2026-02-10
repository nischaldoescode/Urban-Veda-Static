
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

export interface SectionContent {
  headline: string;
  subtext: string;
  image: string;
  extraText?: string;
}

export interface SiteConfig {
  logoName: string;
  logoImage?: string;
  heroHeadline: string;
  heroSubtext: string;
  whatsappLink: string;
  announcement: string;
  metaDescription: string;
  metaKeywords: string;
  cloudinaryPreset?: string;
  cloudinaryCloudName?: string;
  
  // Dynamic Page Contents
  aboutPage: SectionContent;
  philosophyPage: SectionContent;
  testimonialsHeader: { title: string; subtitle: string; };
}

export interface AppState {
  juices: Juice[];
  config: SiteConfig;
}

export interface Testimonial {
  id: string;
  name: string;
  age?: number;
  condition: string;
  text: string;
}

// Fixed: Added missing Disease interface required by constants.ts
export interface Disease {
  id: string;
  title: string;
  shortDesc: string;
  whyItMatters: string;
  modernStressors: string;
  symptoms: string[];
  ayurvedicView: string;
  keyHerbs: { name: string; description: string; }[];
  habits: string[];
  relatedProductId: string;
}

// Fixed: Added missing Product interface required by constants.ts
export interface Product {
  id: string;
  name: string;
  purpose: string;
  shortDesc: string;
  image: string;
  longDesc: string;
  ingredients: { name: string; why: string; }[];
  howToConsume: string;
  whoShouldAvoid: string;
  relatedDiseaseId: string;
}
