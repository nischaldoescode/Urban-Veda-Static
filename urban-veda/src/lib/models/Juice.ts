// juice product schema
import mongoose, { Schema, Model } from "mongoose";

export interface IJuice {
  _id: string;
  name: string;
  ingredients: string;
  benefits: string;
  description: string;
  image: string; // cloudinary url in webp format
  orderLink: string;
  isPopular: boolean;
  sortOrder: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JuiceSchema = new Schema<IJuice>(
  {
    name: { type: String, required: true, trim: true },
    ingredients: { type: String, required: true },
    benefits: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    orderLink: { type: String, required: true },
    isPopular: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

const Juice: Model<IJuice> =
  mongoose.models.Juice || mongoose.model<IJuice>("Juice", JuiceSchema);

export default Juice;
