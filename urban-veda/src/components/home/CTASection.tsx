"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";

interface CTASectionProps {
  headline?: string;
  subtext?: string;
}

export default function CTASection({ headline, subtext }: CTASectionProps) {
  // parse headline — if it contains a newline use it, otherwise split on "avoid" for styling
  const rawHeadline = headline || "drink today, avoid the doctor tomorrow";

  // split into two lines for display
  // default split: before "avoid" and after
  let line1 = "";
  let line2 = "";
  let highlightWord = "";

  if (headline) {
    // if admin typed with newline, respect it
    if (headline.includes("\n")) {
      const parts = headline.split("\n");
      line1 = parts[0] || "";
      line2 = parts.slice(1).join(" ");
    } else {
      // just show as single block
      line1 = headline;
    }
  } else {
    line1 = "drink today,";
    line2 = "tomorrow";
    highlightWord = "avoid the doctor";
  }

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-sage-dark text-white px-4 sm:px-6 overflow-hidden relative">
      {/* decorative blobs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-olive rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-herbal-green rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center space-y-8 sm:space-y-10"
        >
          {/* quote icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, type: "spring" }}
            className="flex justify-center"
          >
            <div className="bg-olive/20 p-4 sm:p-5 rounded-2xl">
              <Quote className="text-olive" size={36} />
            </div>
          </motion.div>

          {/* headline */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {headline ? (
              // admin-provided text — respect newlines, show as-is
              <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl italic leading-relaxed font-serif whitespace-pre-line">
                {rawHeadline}
              </p>
            ) : (
              // default styled version with olive highlight
              <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl italic leading-relaxed font-serif">
                drink today,
                <br />
                <span className="text-olive">avoid the doctor</span> tomorrow
              </p>
            )}
          </motion.div>

          {/* subtext */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-herbal-green uppercase tracking-[0.3em] text-xs font-bold whitespace-pre-line">
              {subtext || "nature's prescription"}
            </span>
            <div className="h-12 w-px bg-olive/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
