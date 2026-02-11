// hero section with parallax and animations
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import { SiteConfig } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroSectionProps {
  config: SiteConfig;
}

export default function HeroSection({ config }: HeroSectionProps) {
  const { scrollY } = useScroll();

  // parallax effect for image
  const imageY = useTransform(scrollY, [0, 500], [0, 150]);
  const textY = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-bg via-white to-olive/5" />

      {/* floating decorative elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-20 right-10 w-32 h-32 bg-olive/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-40 left-10 w-40 h-40 bg-herbal-green/10 rounded-full blur-3xl"
      />

      <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-0 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* text content */}
          <motion.div style={{ y: textY, opacity }} className="space-y-8 z-10">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Badge className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-olive/10 text-olive border-olive/20 font-semibold tracking-wide mb-6">
                <Sparkles size={16} />
                exclusive for sobha city residents
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-sage-dark leading-[1.1] font-serif"
            >
              {config.heroHeadline.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
                  className="inline-block mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl text-gray-600 max-w-lg leading-relaxed font-light"
            >
              {config.heroSubtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <Link href="/products">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-olive hover:bg-olive/90 text-white font-bold px-8 py-6 rounded-full text-base group shadow-lg hover:shadow-xl transition-all"
                >
                  trial my pack
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={18}
                  />
                </Button>
              </Link>

              <a
                href={config.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  size="lg"
                  className="w-full sm:w-auto border-2 border-gray-200 hover:border-olive hover:bg-olive/5 text-sage-dark font-bold px-8 py-6 rounded-full text-base"
                >
                  <MessageCircle className="mr-2 text-green-600" size={18} />
                  join community
                </Button>
              </a>
            </motion.div>

            {/* trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="flex flex-wrap items-center gap-6 pt-6 text-sm text-gray-500"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>100% organic</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>no preservatives</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span>daily fresh</span>
              </div>
            </motion.div>
          </motion.div>

          {/* hero image */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative aspect-[4/5] lg:aspect-square"
          >
            {/* glow effect */}
            <div className="absolute -inset-10 bg-gradient-to-br from-olive/20 to-herbal-green/20 rounded-full blur-3xl opacity-30 animate-pulse" />

            {/* main image */}
            <div className="relative rounded-[3rem] overflow-hidden shadow-2xl h-full">
              <Image
                src="https://images.unsplash.com/photo-1556760544-74068564f056?auto=format&fit=crop&q=80&w=1200"
                alt="Fresh Herbal Ingredients"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />

              {/* overlay badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.2 }}
                className="absolute bottom-8 left-8 right-8"
              >
                <div className="bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-bold text-olive uppercase tracking-widest mb-1">
                        fresh today
                      </p>
                      <p className="text-2xl font-bold text-sage-dark">
                        morning delivery
                      </p>
                    </div>
                    <div className="bg-olive/10 p-3 rounded-2xl">
                      <Sparkles className="text-olive" size={24} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* floating icons animation */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute -top-8 -right-8 bg-white p-4 rounded-2xl shadow-lg hidden lg:block"
            >
              <Sparkles className="text-olive" size={32} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
