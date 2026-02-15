// philosophy page - server-side rendered
import { Metadata } from "next";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Config from "@/lib/models/config";
import { SiteConfig } from "@/types";
import PhilosophyCTA from "@/components/philosophy/PhilosophyCTA";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://urbanveda.com"),
  title: "Philosophy",
  description: "Our commitment to honesty, consistency, and ancient wisdom.",
};

export default async function PhilosophyPage() {
  await connectDB();
  const config = await Config.findOne().lean<SiteConfig>();

  if (!config) return null;

  const content = config.philosophyPage;

  return (
    <div className="min-h-screen bg-sage-bg">
      {/* header section */}
      <section className="pt-28 sm:pt-32 pb-10 sm:pb-12 px-4 sm:px-6 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <ScrollReveal delay={0}>
            <span className="text-olive font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs">
              the ethics
            </span>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-sage-dark font-serif">
              {content.headline}
            </h1>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base sm:text-lg text-gray-500 italic max-w-xl mx-auto font-serif">
              "{content.subtext}"
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* image section with overlay text */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-16 sm:pb-20">
        <ScrollReveal delay={0.1}>
          <div className="relative group overflow-hidden rounded-2xl sm:rounded-3xl shadow-xl">
            <div className="relative aspect-[16/9] sm:aspect-[16/8]">
              <Image
                src={content.image}
                alt="Philosophy"
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-6 sm:p-12 text-center">
              <p className="text-white text-lg sm:text-xl md:text-2xl font-light leading-relaxed max-w-2xl">
                {content.extraText}
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* philosophy-specific CTA — separate from home CTA */}
      <PhilosophyCTA
        headline={
          (config as any).philosophyCtaHeadline ||
          "drink today, avoid the doctor tomorrow"
        }
        subtext={
          (config as any).philosophyCtaSubtext || "nature's prescription"
        }
        body={
          (config as any).philosophyCtaBody ||
          "rooted in ayurveda. proven by consistency. no miracle claims, just honest herbs working daily."
        }
        textColor={(config as any).philosophyCtaTextColor || "#ffffff"}
      />
    </div>
  );
}

export const revalidate = 120;
