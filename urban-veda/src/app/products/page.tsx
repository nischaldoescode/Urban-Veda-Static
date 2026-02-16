import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Config from "@/lib/models/config";
import Juice from "@/lib/models/Juice";
import { Juice as JuiceType, SiteConfig } from "@/types";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Leaf } from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://urbanveda.com"),
  title: "Our Juices",
  description:
    "Explore our range of 100% natural, preservative-free Ayurvedic herbal juices.",
};

export default async function ProductsPage() {
  await connectDB();
  const [juices, config] = await Promise.all([
    Juice.find({ isActive: true })
      .sort({ sortOrder: 1, createdAt: -1 })
      .lean<JuiceType[]>(),
    Config.findOne().lean<SiteConfig>(),
  ]);

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: config?.productsPageBgColor || "#ffffff" }}
    >
      {/* hero header */}
      <div className="relative bg-gradient-to-br from-sage-bg via-white to-olive/5 pt-32 pb-16 sm:pb-20 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(85,107,47,0.06)_0%,_transparent_60%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal delay={0}>
            <div className="inline-flex items-center gap-2 bg-olive/10 text-olive border border-olive/20 px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
              <Leaf size={12} />
              {config?.productsPageLabel || "signature collection"}
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-sage-dark font-serif mb-4 whitespace-pre-line">
              {config?.productsPageHeadline || "Healing Elixirs"}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base sm:text-lg text-gray-500 max-w-xl mx-auto italic font-medium mb-8 whitespace-pre-line">
              {config?.productsPageSubtext ||
                "sip health, skip the hospital."}
            </p>
          </ScrollReveal>
          {config?.milkRideSubscribeLink && (
            <ScrollReveal delay={0.3}>
              <a
                href={config.milkRideSubscribeLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-olive text-white px-5 py-2.5 rounded-full font-semibold hover:bg-olive/90 transition-all text-sm shadow-lg"
              >
                {config?.productsPageSubscribeLabel || "Subscribe on Milk Ride"}
                <ArrowRight size={14} />
              </a>
            </ScrollReveal>
          )}
        </div>

        {/* decorative dots grid */}
        <div className="absolute bottom-0 right-0 w-48 h-48 opacity-5">
          <div className="grid grid-cols-6 gap-3">
            {[...Array(36)].map((_, i) => (
              <div key={i} className="w-1.5 h-1.5 rounded-full bg-olive" />
            ))}
          </div>
        </div>
      </div>

      {/* products grid */}
      <div className="py-12 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          {juices.length === 0 ? (
            <div className="text-center py-20 text-gray-400">
              <p>no products available at the moment</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {juices.map((juice, i) => (
                <ScrollReveal key={juice._id.toString()} delay={i * 0.08}>
                  <Link
                    key={juice._id.toString()}
                    href={`/products/${juice.slug}`}
                  >
                    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:border-olive/20 hover:shadow-2xl transition-all duration-400 cursor-pointer">
                      {/* image */}
                      <div className="relative aspect-[3/3.5] overflow-hidden bg-sage-bg">
                        <Image
                          src={juice.image}
                          alt={juice.name}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-108"
                          priority={juice.isPopular}
                        />

                        {/* overlay on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                        {/* badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {juice.isPopular && (
                            <Badge className="bg-olive text-white border-none text-[10px] font-bold px-2.5 py-1 shadow-md">
                              ✦{" "}
                              {config?.productCardBadgeText || "highly requested"}
                            </Badge>
                          )}
                        </div>

                        {/* hover explore text */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-2 group-hover:translate-y-0">
                          <span className="bg-white/95 backdrop-blur-sm text-olive font-bold text-xs px-4 py-2 rounded-full shadow-lg flex items-center gap-1.5">
                            <Sparkles size={11} />
                            {config?.productCardExploreText || "explore blend"}
                          </span>
                        </div>
                      </div>

                      {/* content */}
                      <div className="p-5 sm:p-6">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <h3 className="text-xl sm:text-2xl font-bold text-sage-dark font-serif group-hover:text-olive transition-colors leading-tight">
                            {juice.name}
                          </h3>
                        </div>
                        <p className="text-gray-500 italic text-xs sm:text-sm mb-3 line-clamp-1">
                          {juice.benefits}
                        </p>

                        {/* ingredients preview */}
                        <div className="flex flex-wrap gap-1.5">
                          {juice.ingredients
                            .split(",")
                            .slice(0, 3)
                            .map((ing, idx) => (
                              <span
                                key={idx}
                                className="text-[10px] font-medium bg-olive/8 text-olive px-2 py-0.5 rounded-full border border-olive/15"
                              >
                                {ing.trim()}
                              </span>
                            ))}
                          {juice.ingredients.split(",").length > 3 && (
                            <span className="text-[10px] font-medium bg-gray-50 text-gray-400 px-2 py-0.5 rounded-full border border-gray-100">
                              +{juice.ingredients.split(",").length - 3} more
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export const revalidate = 120;
