// philosophy page - server component
// ALL motion elements are in PhilosophyAnimations.tsx (client component)
// Server components cannot use motion.* directly
import { Metadata } from "next";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Config from "@/lib/models/config";
import { SiteConfig } from "@/types";
import PhilosophyCTA from "@/components/philosophy/PhilosophyCTA";
import {
  PhilosophyHeroText,
  PhilosophyCommitment,
} from "@/components/philosophy/PhilosophyAnimations";

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
    <div
      className="min-h-screen bg-sage-bg"
      style={{ backgroundColor: config.philosophyPageBgColor || "#f7f9f7" }}
    >
      {/*
       * HERO SECTION
       *
       * mt-16 sm:mt-20 pushes the section below the fixed navbar
       * (navbar is h-16=64px mobile, h-20=80px desktop).
       *
       * min-h-[85vh] sm:min-h-[90vh] — increased from 70/80vh so the
       * image appears tall and full, not cropped into a small box.
       *
       * flex-col justify-end — headline sits at the bottom over the dark gradient.
       * The image fills the full section via next/image fill + object-cover.
       */}
      <section className="relative min-h-[108vh] sm:min-h-[106vh] flex flex-col justify-end overflow-hidden mt-20 sm:mt-22">
        {/* full-bleed background image — fills entire section, no aspect-ratio crop */}
        <Image
          src={content.image}
          alt="Philosophy"
          fill
          sizes="100vw"
          className="object-cover object-center"
          priority
        />

        {/* gradient overlay: transparent top → dark bottom so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/45 to-black/10" />

        {/*
         * PhilosophyHeroText is a CLIENT component — contains:
         * - animated label pill (slides down from top)
         * - animated h1 headline (fades + slides up)
         * - animated subtext (fades + slides up, delayed)
         * All use once:false so they replay on every rescroll
         */}
        <PhilosophyHeroText
          headline={content.headline}
          subtext={content.subtext}
        />
      </section>

      {/*
       * COMMITMENT STRIP
       *
       * PhilosophyCommitment is a CLIENT component — contains:
       * - large quote mark that slides in from left
       * - extraText that wipes in left-to-right via clipPath animation
       * Both use once:false so they replay on every rescroll
       */}
      {content.extraText && (
        <PhilosophyCommitment extraText={content.extraText} />
      )}

      {/* PHILOSOPHY CTA — already a client component, handles its own animations */}
      <div className="pt-10 sm:pt-14">
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
    </div>
  );
}

export const revalidate = 120;
