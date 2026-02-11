// site configuration schema
import mongoose, { Schema, Model } from "mongoose";

export interface IConfig {
  logoName: string;
  logoImage?: string;
  heroHeadline: string;
  heroSubtext: string;
  whatsappLink: string;
  milkRideSubscribeLink: string; // new field for milk ride
  announcement: string;
  metaDescription: string;
  metaKeywords: string;
  colorPalette: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
  aboutPage: {
    headline: string;
    subtext: string;
    image: string;
    extraText?: string;
  };
  philosophyPage: {
    headline: string;
    subtext: string;
    image: string;
    extraText?: string;
  };
  updatedAt: Date;
}

const ConfigSchema = new Schema<IConfig>({
  logoName: { type: String, required: true, default: "Urban Veda" },
  logoImage: { type: String },
  heroHeadline: { type: String, required: true },
  heroSubtext: { type: String, required: true },
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
  },
  philosophyPage: {
    headline: { type: String, required: true },
    subtext: { type: String, required: true },
    image: { type: String, required: true },
    extraText: { type: String },
  },
  updatedAt: { type: Date, default: Date.now },
});

const Config: Model<IConfig> =
  mongoose.models.Config || mongoose.model<IConfig>("Config", ConfigSchema);

export default Config;
