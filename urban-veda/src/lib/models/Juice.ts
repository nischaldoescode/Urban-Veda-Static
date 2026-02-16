// juice product schema
import mongoose, { Schema, Model, Document, Types } from "mongoose";

export interface IJuice {
  slug: string;
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

export interface IJuiceDocument extends IJuice, Document {
  _id: Types.ObjectId;
}

const JuiceSchema = new Schema<IJuiceDocument>(
  {
    name: { type: String, required: true, trim: true },
    slug: {
      type: String,
      required: false,
      unique: true,
      index: true,
      trim: true,
    },
    ingredients: { type: String, required: true },
    benefits: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    stickerImage: { type: String, default: "" },
    orderLink: { type: String, required: true },
    isPopular: { type: Boolean, default: false },
    sortOrder: { type: Number, default: 0 },
    isActive: { type: Boolean, default: true },
  },
  {
    timestamps: true,
  },
);

JuiceSchema.pre("save", async function (this: IJuiceDocument) {
  if (!this.slug || this.isModified("name")) {
    const nameWords = this.name
      .split(" ")
      .filter((word) => word.length > 0)
      .slice(0, 2);

    const slugBase = nameWords
      .join("-")
      .toLowerCase()
      .replace(/[^a-z0-9-]/g, "");

    const uniqueId = Math.random().toString(36).substring(2, 8);
    this.slug = `${slugBase}-${uniqueId}`;
  }
});

const Juice: Model<IJuiceDocument> =
  mongoose.models.Juice || mongoose.model<IJuiceDocument>("Juice", JuiceSchema);

export default Juice;
