"use client";

import { motion } from "framer-motion";

interface PhilosophyHeroProps {
  label: string;
  headline: string;
  subtext: string;
  extraText?: string;
}

export default function PhilosophyHero({
  label,
  headline,
  subtext,
  extraText,
}: PhilosophyHeroProps) {
  return (
    <>
      {/* top label */}
      <div className="absolute top-0 left-0 right-0 pt-28 sm:pt-32 flex justify-center z-10">
        <motion.span
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="inline-block text-white/70 font-bold tracking-[0.25em] uppercase text-[10px] sm:text-xs bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
        >
          {label}
        </motion.span>
      </div>

      {/* bottom text block */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-16 pb-10 sm:pb-16 max-w-5xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif leading-tight mb-3 sm:mb-4 drop-shadow-lg"
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="text-base sm:text-lg md:text-xl text-white/75 italic font-serif max-w-2xl leading-relaxed"
        >
          "{subtext}"
        </motion.p>
      </div>

      {/* commitment strip */}
      {extraText && (
        <section className="bg-sage-dark px-4 sm:px-8 lg:px-16 py-10 sm:py-14 overflow-hidden">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4 sm:gap-6">
              <motion.span
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-5xl sm:text-7xl font-serif leading-none flex-shrink-0 select-none"
                style={{ color: "rgba(85,107,47,0.6)", marginTop: "-8px" }}
                aria-hidden
              >
                "
              </motion.span>
              <motion.p
                initial={{ opacity: 0, clipPath: "inset(0 100% 0 0)" }}
                whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)" }}
                viewport={{ once: false, margin: "-60px" }}
                transition={{ duration: 0.9, delay: 0.2, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="text-lg sm:text-xl md:text-2xl text-white/80 font-light leading-relaxed italic font-serif"
              >
                {extraText}
              </motion.p>
            </div>
          </div>
        </section>
      )}
    </>
  );
}