// site configuration schema
import mongoose, { Schema, Model } from "mongoose";

export interface IConfig {
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
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  heroImage?: string;
  navItems?: Array<{
    id: string;
    name: string;
    path: string;
    order: number;
    isVisible: boolean;
  }>;

  aboutPage: {
    headline: string;
    subtext: string;
    image: string;
    extraText?: string;
    features?: Array<{
      icon: string;
      title: string;
      description: string;
    }>;
  };
  philosophyPage: {
    headline: string;
    subtext: string;
    image: string;
    extraText?: string;
  };

  philosophyCtaHeadline?: string;
  philosophyCtaSubtext?: string;
  philosophyCtaBody?: string;
  philosophyCtaTextColor?: string;

  challenges?: Array<{
    icon: string;
    title: string;
    description: string;
    color: string;
    colorHex?: string;
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

  // product preview section
  productPreviewLabel?: string;
  productPreviewHeadline?: string;
  productPreviewSubtext?: string;
  // challenges section
  challengesSectionLabel?: string;
  challengesSectionHeadline?: string;
  challengesSectionSubtext?: string;
  // products page
  productsPageLabel?: string;
  productsPageHeadline?: string;
  productsPageSubtext?: string;
  productsPageSubscribeLabel?: string;
  // cta section
  ctaHeadline?: string;
  ctaSubtext?: string;
  // product card
  productCardBadgeText?: string;
  productCardExploreText?: string;

  updatedAt: Date;
}

const ConfigSchema = new Schema<IConfig>({
  logoName: { type: String, required: true, default: "Urban Veda" },
  logoImage: { type: String },
  heroHeadline: { type: String, required: true },
  heroSubtext: { type: String, required: true },
  challenges: [
    {
      icon: { type: String, default: "Sparkles" },
      title: { type: String },
      description: { type: String },
      color: { type: String },
      colorHex: { type: String },
      iconColor: { type: String },
    },
  ],
  heroStatLabel: { type: String, default: "active herbs" },
  heroStatValue: { type: String, default: "12+" },

  heroImage: { type: String, default: "" },
  navItems: {
    type: [
      {
        id: { type: String },
        name: { type: String },
        path: { type: String },
        order: { type: Number },
        isVisible: { type: Boolean, default: true },
      },
    ],
    default: [
      { id: "1", name: "home", path: "/", order: 1, isVisible: true },
      { id: "2", name: "juices", path: "/products", order: 2, isVisible: true },
      {
        id: "3",
        name: "philosophy",
        path: "/philosophy",
        order: 3,
        isVisible: true,
      },
      { id: "4", name: "about", path: "/about", order: 4, isVisible: true },
      { id: "5", name: "contact", path: "/contact", order: 5, isVisible: true },
    ],
  },

  whatsappLink: { type: String, required: true },
  milkRideSubscribeLink: {
    type: String,
    required: true,
    default: "https://milkride.com/subscribe",
  },
  announcement: { type: String, default: "🌿 trial packs now available!" },
  metaDescription: { type: String },
  metaKeywords: { type: String },
  colorPalette: {
    primary: { type: String, default: "#556b2f" },
    secondary: { type: String, default: "#2d3e2d" },
    accent: { type: String, default: "#8fbc8f" },
    background: { type: String, default: "#f7f9f7" },
  },
  aboutPage: {
    headline: { type: String, required: true },
    subtext: { type: String, required: true },
    image: { type: String, required: true },
    extraText: { type: String },
    features: [
      {
        icon: { type: String, default: "Leaf" },
        title: { type: String },
        description: { type: String },
      },
    ],
  },
  philosophyPage: {
    headline: { type: String, required: true },
    subtext: { type: String, required: true },
    image: { type: String, required: true },
    extraText: { type: String },
  },
  philosophyCtaHeadline: {
    type: String,
    default: "drink today, avoid the doctor tomorrow",
  },
  philosophyCtaSubtext: { type: String, default: "nature's prescription" },
  philosophyCtaBody: {
    type: String,
    default:
      "rooted in ayurveda. proven by consistency. no miracle claims, just honest herbs working daily.",
  },
  philosophyCtaTextColor: { type: String, default: "#ffffff" },

  footerTagline: {
    type: String,
    default: "ancient wisdom for a modern world.",
  },
  socialLinks: {
    instagram: { type: String, default: "#" },
    facebook: { type: String, default: "#" },
    twitter: { type: String, default: "#" },
  },

  contactInfo: {
    phone: { type: String, default: "+91 81234 56789" },
    email: { type: String, default: "hello@urbanveda.com" },
    location: { type: String, default: "sobha city, bangalore" },
    hours: { type: String, default: "mon-sat, 8am-8pm" },
  },

  productOrderNote: {
    type: String,
    default:
      "ordering is currently handled via whatsapp for customized health goals and subscription coordination in sobha city",
  },

  productPreviewLabel: { type: String, default: "signature collection" },
  productPreviewHeadline: { type: String, default: "fresh every morning" },
  productPreviewSubtext: {
    type: String,
    default: "100% preservative-free. delivered to sobha city.",
  },
  challengesSectionLabel: { type: String, default: "modern problems" },
  challengesSectionHeadline: { type: String, default: "lifestyle challenges" },
  challengesSectionSubtext: {
    type: String,
    default: "your busy lifestyle deserves better health support",
  },
  productsPageLabel: { type: String, default: "signature collection" },
  productsPageHeadline: { type: String, default: "Healing Elixirs" },
  productsPageSubtext: {
    type: String,
    default:
      "sip health, skip the hospital. nature's medicine with no side effects.",
  },
  productsPageSubscribeLabel: {
    type: String,
    default: "Subscribe on Milk Ride",
  },
  ctaHeadline: {
    type: String,
    default: "drink today, avoid the doctor tomorrow",
  },
  ctaSubtext: { type: String, default: "nature's prescription" },
  productCardBadgeText: { type: String, default: "highly requested" },
  productCardExploreText: { type: String, default: "explore blend" },

  updatedAt: { type: Date, default: Date.now },
});

const Config: Model<IConfig> =
  mongoose.models.Config || mongoose.model<IConfig>("Config", ConfigSchema);

export default Config;
