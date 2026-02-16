/**
 * fully responsive storytelling hero section
 * with minimal gap and enhanced colors
 */
"use client";

import { motion, useScroll, useTransform } from "framer-motion";
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
import { useRef } from "react";
import ScrollReveal from "@/components/shared/ScrollReveal";
import AnimatedBrush from "@/components/shared/AnimatedBrush";

interface HeroSectionProps {
  config: SiteConfig;
}

export default function HeroSection({ config }: HeroSectionProps) {
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const { scrollYProgress: heroProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: ctaProgress } = useScroll({
    target: ctaRef,
    offset: ["start end", "start start"],
  });

  const imageOpacity = useTransform(heroProgress, [0, 0.5, 1], [0.7, 0.4, 0.2]);
  const imageScale = useTransform(heroProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(heroProgress, [0, 1], [0, -150]);
  const contentOpacity = useTransform(heroProgress, [0, 0.5, 1], [1, 0.7, 0]);

  const ctaY = useTransform(ctaProgress, [0, 1], [100, 0]);
  const trustPills = [
    { icon: Leaf, label: config.trustPill1 || "100% organic" },
    { icon: Shield, label: config.trustPill2 || "no preservatives" },
    { icon: Zap, label: config.trustPill3 || "daily fresh" },
  ];

  return (
    <>
      {/* main hero section */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden pt-16 sm:pt-20 mt-8 sm:mt-7"
      >
        <motion.div
          style={{
            opacity: imageOpacity,
            scale: imageScale,
          }}
          className="absolute inset-0"
        >
          {config.heroImage ? (
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat w-full h-full"
              style={{
                backgroundImage: `url(${config.heroImage})`,
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-sage-bg via-olive/5 to-herbal-green/10" />
          )}

          <motion.div
            style={{
              opacity: useTransform(heroProgress, [0, 1], [1, 0.3]),
            }}
            className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20 sm:from-black/60 sm:via-black/30 sm:to-transparent"
          />
        </motion.div>

        <motion.div
          style={{
            y: contentY,
            opacity: contentOpacity,
          }}
          className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center"
        >
          <ScrollReveal delay={0.1}>
            <div className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-white/90 backdrop-blur-sm border border-gray-200/50 shadow-lg mb-6 sm:mb-8">
              <Sparkles className="text-olive flex-shrink-0" size={14} />
              <span className="text-xs sm:text-sm font-bold text-gray-800 tracking-wide">
                {config.heroBadgeText || "exclusive for sobha city residents"}
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2}>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.1] sm:leading-tight font-serif mb-4 sm:mb-6 drop-shadow-2xl px-2">
              {config.heroHeadline.split(" ").map((word, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  className="inline-block mr-3 sm:mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </h1>
          </ScrollReveal>

          <ScrollReveal delay={0.4}>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90 max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed drop-shadow-lg px-4">
              {config.heroSubtext}
            </p>
          </ScrollReveal>

          <ScrollReveal delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4">
              <Link href="/products" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto group px-6 sm:px-8 py-3 sm:py-4 bg-olive hover:bg-olive/90 text-white font-bold rounded-full shadow-xl hover:shadow-2xl transition-all flex items-center gap-2 justify-center text-sm sm:text-base">
                  <span>{config.heroButtonText || "trial my pack"}</span>
                  <ArrowRight
                    className="group-hover:translate-x-1 transition-transform flex-shrink-0"
                    size={18}
                  />
                </button>
              </Link>

              <a
                href={config.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto"
              >
                <button className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/90 backdrop-blur-sm hover:bg-white text-sage-dark font-bold rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 justify-center border-2 border-transparent hover:border-olive/20 text-sm sm:text-base">
                  <MessageCircle
                    className="text-green-600 flex-shrink-0"
                    size={18}
                  />
                  <span>
                    {config.heroSecondaryButtonText || "join community"}
                  </span>
                </button>
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.6}>
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4 px-4">
              {trustPills.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.7 + i * 0.1 }}
                  className="flex items-center gap-1.5 sm:gap-2 bg-white/95 backdrop-blur-sm px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-md border border-gray-100"
                >
                  <Icon
                    size={12}
                    className="text-olive flex-shrink-0 sm:w-3.5 sm:h-3.5"
                  />
                  <span className="text-xs sm:text-sm font-semibold text-gray-700 whitespace-nowrap">
                    {label}
                  </span>
                </motion.div>
              ))}
            </div>
          </ScrollReveal>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            delay: 1,
            repeat: Infinity,
            repeatType: "reverse",
          }}
          className="hidden sm:block absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-1.5 sm:p-2">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-white rounded-full"
            />
          </div>
        </motion.div>
      </section>

      <div className="h-1" />

      {/* scroll-reveal cta section */}
      <motion.section
        ref={ctaRef}
        style={{
          y: ctaY,
          backgroundColor: config.scrollCtaBgColor || "#2f4538",
        }}
        className="relative py-24 sm:py-32 flex items-center justify-center overflow-hidden"
      >
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="text-[10px] sm:text-xs md:text-sm font-bold uppercase tracking-wider sm:tracking-widest mb-4 sm:mb-6"
            style={{
              color: config.scrollCtaTextColor
                ? `${config.scrollCtaTextColor}99`
                : "#e8f0e899",
            }}
          >
            {config.scrollCtaSubtext || "ancient wisdom"}
          </motion.p>

          <h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-serif italic leading-tight"
            style={{ color: config.scrollCtaTextColor || "#e8f0e8" }}
          >
            {(
              config.scrollCtaHeadline ||
              "nature doesn't rush, yet everything is accomplished"
            )
              .split(" ")
              .map((word, i) =>
                i === 0 || i === 5 ? (
                  <AnimatedBrush
                    key={i}
                    brushColor={config.scrollCtaBrushColor || "#6b8e6f"}
                    delay={i * 0.1}
                  >
                    {word}
                  </AnimatedBrush>
                ) : (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className="inline-block mx-2 sm:mx-3"
                  >
                    {word}
                  </motion.span>
                ),
              )}
          </h2>
        </div>
      </motion.section>
    </>
  );
}
