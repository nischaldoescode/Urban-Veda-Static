// philosophy page - server-side rendered
import { Metadata } from "next";
import Image from "next/image";
import connectDB from "@/lib/mongodb";
import Config from "@/lib/models/config";
import { SiteConfig } from "@/types";

export const metadata: Metadata = {
  metadataBase: new URL("https://urbanveda.com"),
  title: "Philosophy",
  description: "Our commitment to honesty, consistency, and ancient wisdom.",
};

export default async function PhilosophyPage() {
  await connectDB();
  const config = await Config.findOne().lean<SiteConfig>();

  if (!config) {
    return null;
  }

  const content = config.philosophyPage;

  return (
    <div className="min-h-screen bg-sage-bg">
      {/* header section */}
      <section className="py-32 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
          <span className="text-olive font-bold tracking-[0.2em] uppercase text-xs">
            the ethics
          </span>
          <h1 className="text-6xl md:text-8xl font-bold text-sage-dark font-serif">
            {content.headline}
          </h1>
          <p className="text-2xl text-gray-500 italic max-w-2xl mx-auto font-serif">
            "{content.subtext}"
          </p>
        </div>
      </section>

      {/* image section with overlay text */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="relative group overflow-hidden rounded-[4rem] shadow-2xl">
          <div className="relative aspect-video">
            <Image
              src={content.image}
              alt="Philosophy"
              fill
              sizes="100vw"
              className="object-cover transition-transform duration-1000 group-hover:scale-105"
              priority
            />
          </div>

          {/* overlay text */}
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-20 text-center">
            <p className="text-white text-3xl md:text-4xl font-light leading-relaxed max-w-3xl">
              {content.extraText}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export const revalidate = 120;
