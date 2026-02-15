import { Metadata } from "next";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Config from "@/lib/models/config";
import { SiteConfig } from "@/types";
import {
  Leaf,
  Shield,
  Users,
  Eye,
  Sparkles,
  Heart,
  Zap,
  ShieldCheck,
  FlameKindling,
  Star,
} from "lucide-react";
import ScrollReveal from "@/components/shared/ScrollReveal";

export const metadata: Metadata = {
  metadataBase: new URL("https://urbanveda.com"),
  title: "About Us",
  description:
    "The Urban Veda story — bridging ancient wisdom with modern life.",
};

const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  Leaf,
  Shield,
  Users,
  Eye,
  Sparkles,
  Heart,
  Zap,
  ShieldCheck,
  FlameKindling,
  Star,
};

const defaultFeatures = [
  {
    icon: "Shield",
    title: "purity first",
    description: "no preservatives, no shortcuts. just pure herbal extracts.",
  },
  {
    icon: "Sparkles",
    title: "small batches",
    description: "handcrafted daily to ensure maximum freshness and potency.",
  },
  {
    icon: "Users",
    title: "community care",
    description: "personalized health consultations for every customer.",
  },
  {
    icon: "Eye",
    title: "transparent process",
    description: "from sourcing to delivery, complete visibility.",
  },
];

export default async function AboutPage() {
  await connectDB();
  const config = await Config.findOne().lean<SiteConfig>();

  if (!config) return null;

  const content = config.aboutPage;
  const features = (content as any).features?.length
    ? (content as any).features
    : defaultFeatures;

  return (
    <div className="min-h-screen bg-white">
      {/* hero */}
      <section className="relative bg-gradient-to-br from-sage-bg via-white to-olive/5 pt-32 pb-16 px-4 sm:px-6 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(85,107,47,0.06)_0%,_transparent_60%)]" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="inline-block text-olive font-bold tracking-[0.2em] uppercase text-[10px] sm:text-xs mb-3">
            our story
          </span>
          <ScrollReveal delay={0}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-sage-dark font-serif mb-4">
              {content.headline}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed">
              {content.subtext}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* image */}
      {content.image && (
        <ScrollReveal delay={0.15} direction="left">
          <section className="px-4 sm:px-6 py-10 sm:py-12">
            <div className="max-w-4xl mx-auto">
              <div className="relative aspect-[16/9] sm:aspect-[16/8] rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl group">
                <Image
                  src={content.image}
                  alt="About Urban Veda"
                  fill
                  sizes="100vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* extra quote */}
      {content.extraText && (
        <ScrollReveal delay={0.15} direction="right">
          <section className="px-4 sm:px-6 py-8">
            <div className="max-w-3xl mx-auto text-center">
              <blockquote className="text-xl sm:text-2xl font-serif italic text-sage-dark leading-relaxed border-l-4 border-olive pl-6 text-left">
                "{content.extraText}"
              </blockquote>
            </div>
          </section>
        </ScrollReveal>
      )}

      {/* feature cards */}
      <section className="px-4 sm:px-6 py-10 sm:py-12 bg-sage-bg">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {features.map((f: any, i: number) => {
              const Icon = iconMap[f.icon] || Leaf;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div
                    key={i}
                    className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-100 hover:border-olive/20 hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-olive/10 p-2.5 rounded-xl flex-shrink-0 group-hover:bg-olive/20 transition-colors">
                        <Icon size={18} className="text-olive" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sage-dark text-sm sm:text-base mb-1">
                          {f.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                          {f.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export const revalidate = 120;
