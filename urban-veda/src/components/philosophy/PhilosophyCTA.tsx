"use client";

import { motion } from "framer-motion";
import { useRef } from "react";

interface PhilosophyCTAProps {
  headline: string;
  subtext: string;
  body: string;
  textColor: string;
}

// splits headline into words — underlines the LAST word with grow animation
function AnimatedHeadline({ text, textColor }: { text: string; textColor: string }) {
  const words = text.split(" ");
  const lastWord = words[words.length - 1];
  const otherWords = words.slice(0, -1).join(" ");

  return (
    <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold font-serif leading-tight max-w-3xl mx-auto">
      {otherWords && (
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{ color: textColor }}
        >
          {otherWords}{" "}
        </motion.span>
      )}
      {/* last word with underline that draws in */}
      <motion.span
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
        className="relative inline-block"
        style={{ color: textColor }}
      >
        {lastWord}
        {/* animated underline */}
        <motion.span
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, delay: 0.55, ease: [0.21, 0.47, 0.32, 0.98] }}
          style={{
            originX: 0,
            display: "block",
            position: "absolute",
            bottom: "-4px",
            left: 0,
            right: 0,
            height: "3px",
            background: "#556b2f", // olive
            borderRadius: "2px",
          }}
        />
      </motion.span>
    </h2>
  );
}

export default function PhilosophyCTA({ headline, subtext, body, textColor }: PhilosophyCTAProps) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-20 sm:pb-28">
      <div className="bg-sage-dark rounded-2xl sm:rounded-3xl px-6 sm:px-12 lg:px-20 py-14 sm:py-20 text-center relative overflow-hidden">

        {/* subtle dot texture — no gradient */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 space-y-7">

          {/* label pill — animates in first */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block text-[10px] sm:text-xs font-bold tracking-[0.3em] uppercase px-4 py-2 rounded-full border"
              style={{ color: "#556b2f", borderColor: "rgba(85,107,47,0.5)" }}
            >
              {subtext}
            </span>
          </motion.div>

          {/* headline with animated underline on last word */}
          <AnimatedHeadline text={headline} textColor={textColor} />

          {/* decorative divider — animates after headline */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex items-center justify-center gap-4"
          >
            <div className="h-px w-16 bg-olive/40" />
            <div className="w-1.5 h-1.5 rounded-full bg-olive" />
            <div className="h-px w-16 bg-olive/40" />
          </motion.div>

          {/* body text — animates last */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-sm sm:text-base max-w-md mx-auto leading-relaxed"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            {body}
          </motion.p>
        </div>
      </div>
    </section>
  );
}