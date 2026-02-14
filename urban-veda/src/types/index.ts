// complete type definitions for the application

export interface Juice {
  _id: string;
  name: string;
  ingredients: string;
  benefits: string;
  description: string;
  image: string;
  stickerImage?: string;
  orderLink: string;
  isPopular: boolean;
  sortOrder: number;
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface SectionContent {
  headline: string;
  subtext: string;
  image: string;
  extraText?: string;
}

export interface ColorPalette {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
}

export interface SiteConfig {
  logoName: string;
  logoImage?: string;
  heroHeadline: string;
  heroSubtext: string;
  heroStatLabel?: string;
  heroStatValue?: string;
  whatsappLink: string;
  milkRideSubscribeLink: string;
  announcement: string;
  metaDescription: string;
  metaKeywords: string;
  colorPalette: ColorPalette;
  aboutPage: SectionContent;
  philosophyPage: SectionContent;
  challenges?: Array<{
    icon: string;
    title: string;
    description: string;
    color: string;
    iconColor: string;
  }>;
  footerTagline?: string;
  socialLinks?: {
    instagram?: string;
    facebook?: string;
    twitter?: string;
  };
  contactInfo?: {
    phone?: string;
    email?: string;
    location?: string;
    hours?: string;
  };

  productOrderNote?: string;
  productPreviewLabel?: string;
  productPreviewHeadline?: string;
  productPreviewSubtext?: string;
  challengesSectionLabel?: string;
  challengesSectionHeadline?: string;
  challengesSectionSubtext?: string;
  productsPageLabel?: string;
  productsPageHeadline?: string;
  productsPageSubtext?: string;
  productsPageSubscribeLabel?: string;
  ctaHeadline?: string;
  ctaSubtext?: string;
  productCardBadgeText?: string;
  productCardExploreText?: string;

  updatedAt?: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}
