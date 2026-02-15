"use client";

import { motion } from "framer-motion";

interface PhilosophyHeroTextProps {
  headline: string;
  subtext: string;
}

interface PhilosophyCommitmentProps {
  extraText: string;
}

// ── HERO LABEL + TEXT — animated, replays on rescroll ──
export function PhilosophyHeroText({
  headline,
  subtext,
}: PhilosophyHeroTextProps) {
  return (
    <>
      {/* top label pill */}
      <div className="absolute top-0 left-0 right-0 pt-28 sm:pt-32 flex justify-center z-10">
        <motion.span
          initial={{ opacity: 0, y: -12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="inline-block text-white/70 font-bold tracking-[0.25em] uppercase text-[10px] sm:text-xs bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20"
        >
          the ethics
        </motion.span>
      </div>

      {/* bottom headline + subtext — sits on dark gradient */}
      <div className="relative z-10 px-4 sm:px-8 lg:px-16 pb-12 sm:pb-20 max-w-5xl mx-auto w-full">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{
            duration: 0.6,
            delay: 0.1,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white font-serif leading-tight mb-3 sm:mb-5 drop-shadow-lg"
        >
          {headline}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-40px" }}
          transition={{
            duration: 0.6,
            delay: 0.2,
            ease: [0.21, 0.47, 0.32, 0.98],
          }}
          className="text-base sm:text-lg md:text-xl text-white/75 italic font-serif max-w-2xl leading-relaxed"
        >
          "{subtext}"
        </motion.p>
      </div>
    </>
  );
}

// ── COMMITMENT STRIP — quote mark slides in, text wipes left-to-right ──
export function PhilosophyCommitment({ extraText }: PhilosophyCommitmentProps) {
  return (
    <section className="bg-sage-dark px-4 sm:px-8 lg:px-16 py-10 sm:py-16 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start gap-4 sm:gap-6">
          {/*
           * Quote mark: slides from x:-40 → x:0, fades in.
           * once:false → resets and replays every rescroll.
           */}
          <motion.span
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "0px" }}
            transition={{ duration: 0.5, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="text-6xl sm:text-8xl font-serif leading-none flex-shrink-0 select-none"
            style={{ color: "rgba(85,107,47,0.65)", marginTop: "-12px" }}
            aria-hidden
          >
            "
          </motion.span>

          {/*
           * Text: clipPath wipe from left to right.
           * inset(0 100% 0 0) = fully clipped from the right = nothing visible.
           * inset(0 0% 0 0)   = no clipping = fully visible.
           * Grows left→right so it feels like text is being written/revealed.
           * once:false → replays every rescroll.
           * delay:0.2 so quote mark leads.
           */}
          <motion.p
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, margin: "-20px" }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            className="text-lg sm:text-xl md:text-2xl text-white/80 font-light leading-relaxed italic font-serif pt-2"
          >
            {extraText}
          </motion.p>
        </div>
      </div>
    </section>
  );
}
