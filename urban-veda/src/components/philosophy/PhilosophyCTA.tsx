"use client";

import { motion } from "framer-motion";

interface PhilosophyCTAProps {
  headline: string;
  subtext: string;
  body: string;
  textColor: string;
}

// Raw wavy SVG underline — hand-drawn brush feel
function RawUnderlineSVG({ color }: { color: string }) {
  return (
    <svg
      viewBox="0 0 200 12"
      preserveAspectRatio="none"
      className="absolute w-full pointer-events-none"
      style={{ bottom: "-10px", left: 0, height: "12px" }}
      aria-hidden
    >
      {/* main wavy line — irregular so it looks hand-drawn */}
      <motion.path
        d="M2,8 C20,4 38,11 58,7 C78,3 96,10 118,6 C140,2 158,9 178,6 C190,4 196,7 198,8"
        fill="none"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{
          duration: 0.9,
          delay: 0.55,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      />
      {/* second overlapping line slightly offset — adds rawness/texture */}
      <motion.path
        d="M2,9.5 C22,7 40,11.5 60,8.5 C82,5 100,10.5 122,7 C144,3.5 162,9 180,7 C192,5.5 197,8 198,9"
        fill="none"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeOpacity="0.45"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{
          duration: 1.1,
          delay: 0.7,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
      />
    </svg>
  );
}

// Splits headline — last word gets SVG underline + color shift as underline draws in
function AnimatedHeadline({
  text,
  textColor,
}: {
  text: string;
  textColor: string;
}) {
  const words = text.split(" ");
  const lastWord = words[words.length - 1];
  const otherWords = words.slice(0, -1).join(" ");

  // the color the last word transitions TO as the underline paints under it
  const paintedColor = "#7a9a3a";

  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif leading-tight max-w-4xl mx-auto px-2">
      {/* all words except the last */}
      {otherWords && (
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ color: textColor }}
        >
          {otherWords}{" "}
        </motion.span>
      )}

      {/* last word wrapper — holds the text + SVG underline */}
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-80px" }}
        transition={{
          duration: 0.6,
          delay: 0.15,
          ease: [0.21, 0.47, 0.32, 0.98],
        }}
        className="relative inline-block"
        style={{ paddingBottom: "14px" }}
      >
        {/*
         * The last word's color starts at textColor (white/user-set),
         * then shifts to paintedColor (olive-green) timed to when the
         * underline SVG reaches roughly halfway under the word (~0.6s delay).
         * This makes it feel like the underline is "coloring" the word.
         */}
        <motion.span
          initial={{ color: textColor }}
          whileInView={{ color: paintedColor }}
          viewport={{ once: false, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.6, ease: "easeInOut" }}
          style={{ display: "inline" }}
        >
          {lastWord}
        </motion.span>

        {/* raw hand-drawn SVG underline */}
        <RawUnderlineSVG color={paintedColor} />
      </motion.span>
    </h2>
  );
}

export default function PhilosophyCTA({
  headline,
  subtext,
  body,
  textColor,
}: PhilosophyCTAProps) {
  return (
    <section className="w-full px-3 sm:px-6 lg:px-8 pb-16 sm:pb-24">
      <div className="max-w-5xl mx-auto">
        <div className="bg-sage-dark rounded-2xl sm:rounded-3xl px-5 sm:px-10 lg:px-16 py-12 sm:py-16 lg:py-20 text-center relative overflow-hidden">
          {/* subtle dot texture */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "20px 20px",
            }}
          />

          <div className="relative z-10 space-y-6 sm:space-y-8">
            {/* label pill */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.5 }}
            >
              <span
                className="inline-block text-[9px] sm:text-[10px] lg:text-xs font-bold tracking-[0.3em] uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border"
                style={{
                  color: "#7a9a3a",
                  borderColor: "rgba(122,154,58,0.45)",
                }}
              >
                {subtext}
              </span>
            </motion.div>

            {/* headline with color-shift + raw underline */}
            <AnimatedHeadline text={headline} textColor={textColor} />

            {/*
             * DIVIDER — two-tier for visibility:
             *
             * Top tier:  long thick lines + bold center dot (main separator)
             * Bot tier:  short faint lines + tiny dot (adds depth below)
             *
             * Lines are h-[1.5px] (not h-px) and bg-olive/70 (not /40) — much more visible.
             * Both tiers animate in together after the headline.
             */}
            <motion.div
              initial={{ opacity: 0, scaleX: 0 }}
              whileInView={{ opacity: 1, scaleX: 1 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-col items-center gap-1.5 sm:gap-2"
            >
              {/* tier 1 — primary */}
              <div className="flex items-center justify-center gap-3 sm:gap-4">
                <div className="h-[1.5px] w-16 sm:w-24 lg:w-32 bg-olive/70 rounded-full" />
                <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-olive" />
                <div className="h-[1.5px] w-16 sm:w-24 lg:w-32 bg-olive/70 rounded-full" />
              </div>
              {/* tier 2 — secondary, adds depth */}
              <div className="flex items-center justify-center gap-2 sm:gap-3">
                <div className="h-px w-6 sm:w-10 bg-olive/30 rounded-full" />
                <div className="w-1 h-1 rounded-full bg-olive/35" />
                <div className="h-px w-6 sm:w-10 bg-olive/30 rounded-full" />
              </div>
            </motion.div>

            {/*
             * Body text:
             * max-w loosened from max-w-md (28rem) → max-w-2xl (42rem) on desktop
             * so it breathes and reads as a proper paragraph, not a thin column.
             * opacity dropped slightly to 0.5 to keep hierarchy below headline.
             * leading-loose on sm+ for comfortable reading.
             */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.95 }}
              className="text-xs sm:text-sm lg:text-base max-w-xs sm:max-w-lg lg:max-w-2xl mx-auto leading-relaxed sm:leading-loose tracking-wide"
              style={{ color: "rgba(255,255,255,0.5)" }}
            >
              {body}
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
}
