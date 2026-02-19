// get and update site configuration
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Config from "@/lib/models/config";
import { isAuthenticated } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { protectAPIRoute } from "@/lib/apiProtection";

export async function GET(request: NextRequest) {
  try {
    // Check if request is from allowed source
    const protectionError = await protectAPIRoute(request);
    if (protectionError) {
      console.log("API Protection blocked request to GET /api/config");
      return protectionError;
    }

    console.log("API Protection allowed request to GET /api/config");

    await connectDB();

    let config = await Config.findOne();

    // create default config if doesn't exist
    if (!config) {
      config = await Config.create({
        logoName: "Urban Veda",
        heroHeadline: "Modern Life. Ancient Wisdom.",
        heroSubtext:
          "Freshly cold-pressed herbal juices delivered daily to your doorstep.",
        whatsappLink: "https://chat.whatsapp.com/HGAz9W01xJsHpIHnGUn38M",
        milkRideSubscribeLink: "https://milkride.com/subscribe",
        metaDescription:
          "Premium Ayurvedic herbal juices for modern lifestyles",
        metaKeywords: "ayurveda, herbal juice, detox, health",
        aboutPage: {
          headline: "The Urban Veda Story",
          subtext: "We bridge ancient health rituals with modern schedules.",
          image: "/images/about-hero.webp",
          extraText: "Small batches, fresh extraction, total transparency.",
        },
        philosophyPage: {
          headline: "Honesty is our Main Ingredient",
          subtext: "Consistency over miracle claims. Roots over quick fixes.",
          image: "/images/philosophy-hero.webp",
          extraText: "No mass production. No preservatives. Pure extracts.",
        },
      });
    }

    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    console.error("config fetch error:", error);
    return NextResponse.json(
      { success: false, error: "failed to fetch config" },
      { status: 500 },
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    // Check if request is from allowed source with CSRF
    const protectionError = await protectAPIRoute(request, {
      requireAuth: true,
      requireCSRF: true,
    });
    if (protectionError) {
      console.log("API Protection blocked request to PUT /api/config");
      return protectionError;
    }

    console.log("API Protection allowed request to PUT /api/config");

    const authenticated = await isAuthenticated();
    if (!authenticated) {
      return NextResponse.json(
        { success: false, error: "unauthorized" },
        { status: 401 },
      );
    }

    const updates = await request.json();

    await connectDB();

    const config = await Config.findOneAndUpdate(
      {},
      { ...updates, updatedAt: new Date() },
      { returnDocument: "after", upsert: true },
    );

    // revalidate all pages that use config
    revalidatePath("/", "layout");

    return NextResponse.json({ success: true, data: config });
  } catch (error) {
    console.error("config update error:", error);
    return NextResponse.json(
      { success: false, error: "failed to update config" },
      { status: 500 },
    );
  }
}
