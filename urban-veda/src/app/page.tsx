// home page - server-side rendered with database data
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ShieldCheck,
  HeartPulse,
  Sparkles,
  MessageCircle,
} from "lucide-react";
import connectDB from "@/lib/mongodb";
import Config from "@/lib/models/config";
import Juice from "@/lib/models/Juice";
import { SiteConfig, Juice as JuiceType } from "@/types";
import HeroSection from "@/components/home/HeroSection";
import ChallengesSection from "@/components/home/ChallengesSection";
import ProductPreview from "@/components/home/ProductPreview";
import CTASection from "@/components/home/CTASection";

// generate metadata for seo
export async function generateMetadata(): Promise<Metadata> {
  await connectDB();
  const rawConfig = await Config.findOne().lean();
  const config = rawConfig ? JSON.parse(JSON.stringify(rawConfig)) : null;
  
  return {
    title: "Home",
    description: config?.metaDescription || "Ancient wisdom for modern life",
    keywords: config?.metaKeywords?.split(",") || [],
    openGraph: {
      title: config?.heroHeadline || "Urban Veda",
      description: config?.heroSubtext || "",
      images: [config?.logoImage || "/images/og-image.webp"],
    },
  };
}

// server component - fetches data on every request
export default async function HomePage() {
  // fetch config and juices in parallel for better performance
  await connectDB();

  const [config, juices] = await Promise.all([
    Config.findOne().lean<SiteConfig>(),
    Juice.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .limit(2)
      .lean<JuiceType[]>(),
  ]);

  // fallback if no config exists
  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">loading configuration...</p>
      </div>
    );
  }

  return (
    <main className="overflow-x-hidden">
      {/* hero section with dynamic content */}
      <HeroSection config={config} />

      {/* lifestyle challenges section */}
      <ChallengesSection />

      {/* featured products preview */}
      <ProductPreview juices={juices} />

      {/* call to action quote */}
      <CTASection />
    </main>
  );
}

// revalidate this page every 60 seconds
export const revalidate = 60;
