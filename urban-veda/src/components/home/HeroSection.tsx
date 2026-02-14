"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  MessageCircle,
  Sparkles,
  Leaf,
  Shield,
  Zap,
} from "lucide-react";
import { SiteConfig } from "@/types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRef } from "react";

interface HeroSectionProps {
  config: SiteConfig;
}

export default function HeroSection({ config }: HeroSectionProps) {
  const { scrollY } = useScroll();
  const containerRef = useRef<HTMLElement>(null);

  const imageY = useTransform(scrollY, [0, 500], [0, 80]);
  const textY = useTransform(scrollY, [0, 500], [0, 60]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center overflow-hidden pt-20"
    >
      {/* layered background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-bg via-white to-olive/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(85,107,47,0.08)_0%,_transparent_60%)]" />

      {/* animated blobs */}
      <motion.div
        animate={{ y: [0, -24, 0], rotate: [0, 6, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-24 right-8 w-48 h-48 bg-olive/8 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 24, 0], rotate: [0, -6, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 left-4 w-56 h-56 bg-herbal-green/8 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -16, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/3 w-32 h-32 bg-olive/5 rounded-full blur-2xl pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* text content */}
          <motion.div
            style={{ y: textY, opacity }}
            className="space-y-6 z-10 order-2 lg:order-1"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <Badge className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-olive/10 text-olive border-olive/20 font-semibold tracking-wide text-xs">
                <Sparkles size={13} />
                exclusive for sobha city residents
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-sage-dark leading-[1.1] font-serif"
            >
              {config.heroHeadline.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08 }}
                  className="inline-block mr-2 sm:mr-3"
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-base sm:text-lg text-gray-600 max-w-lg leading-relaxed font-light"
            >
              {config.heroSubtext}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-col sm:flex-row gap-3 pt-2"
            >
              <Link href="/products">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-olive hover:bg-olive/90 text-white font-bold px-6 py-5 rounded-full text-sm group shadow-lg hover:shadow-xl transition-all"
                >
                  trial my pack
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={16}
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
                  className="w-full sm:w-auto border-2 border-gray-200 hover:border-olive hover:bg-olive/5 text-sage-dark font-bold px-6 py-5 rounded-full text-sm"
                >
                  <MessageCircle className="mr-2 text-green-600" size={16} />
                  join community
                </Button>
              </a>
            </motion.div>

            {/* trust pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="flex flex-wrap items-center gap-3 pt-2"
            >
              {[
                { icon: Leaf, label: "100% organic" },
                { icon: Shield, label: "no preservatives" },
                { icon: Zap, label: "daily fresh" },
              ].map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-1.5 bg-white/80 border border-gray-100 px-3 py-1.5 rounded-full shadow-sm"
                >
                  <Icon size={12} className="text-olive" />
                  <span className="text-xs font-semibold text-gray-600">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* hero image with 3D tilt effect */}
          <motion.div
            style={{ y: imageY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative order-1 lg:order-2"
          >
            {/* glow */}
            <div className="absolute -inset-6 bg-gradient-to-br from-olive/15 to-herbal-green/15 rounded-[4rem] blur-3xl opacity-40 animate-pulse" />

            {/* 3D card wrapper with parallax zoom */}
            <motion.div
              whileHover={{ rotateY: -4, rotateX: 2, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              style={{ transformStyle: "preserve-3d", perspective: 1000 }}
              className="relative rounded-[2.5rem] sm:rounded-[3rem] overflow-hidden shadow-2xl aspect-[4/5] sm:aspect-[4/4.5] lg:aspect-[4/5]"
            >
              {/* parallax inner image — zooms in as page scrolls */}
              <motion.div
                style={{ scale: useTransform(scrollY, [0, 600], [1, 1.18]) }}
                className="absolute inset-0"
              >
                <Image
                  src="https://images.unsplash.com/photo-1556760544-74068564f056?auto=format&fit=crop&q=80&w=1200"
                  alt="Fresh Herbal Ingredients"
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                  priority
                />
              </motion.div>

              {/* gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* bottom badge — pb ensures it doesn't cut off */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="absolute bottom-0 left-0 right-0 p-4 sm:p-5"
              >
                <div className="bg-white/95 backdrop-blur-xl p-3.5 sm:p-4 rounded-2xl shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-bold text-olive uppercase tracking-widest mb-0.5">
                        {config.heroStatLabel ? "fresh today" : "fresh today"}
                      </p>
                      <p className="text-base sm:text-lg font-bold text-sage-dark">
                        morning delivery
                      </p>
                    </div>
                    <div className="bg-olive/10 p-2 rounded-xl">
                      <Sparkles className="text-olive" size={18} />
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* floating badge top right */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-2 sm:-right-6 bg-white p-3 rounded-2xl shadow-lg hidden sm:block z-10"
            >
              <Sparkles className="text-olive" size={24} />
            </motion.div>

            {/* floating stat card */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 1.2 }}
              className="absolute -left-4 sm:-left-8 top-1/3 bg-white rounded-2xl shadow-lg p-3 sm:p-4 hidden sm:block z-10"
            >
              <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                {config.heroStatLabel || "active herbs"}
              </p>
              <p className="text-2xl font-bold text-sage-dark">
                {config.heroStatValue || "12+"}
              </p>
              <div className="flex gap-1 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="w-1.5 h-4 bg-olive/30 rounded-full"
                    style={{ height: `${8 + i * 4}px` }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
