// call-to-action quote section
'use client';

import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-20 lg:py-32 bg-sage-dark text-white px-6 overflow-hidden relative">
      {/* decorative elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 bg-olive rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-herbal-green rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center space-y-12"
        >
          {/* quote icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="flex justify-center"
          >
            <div className="bg-olive/20 p-6 rounded-3xl">
              <Quote className="text-olive" size={48} />
            </div>
          </motion.div>

          {/* quote text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl italic leading-relaxed font-serif"
          >
            drink today,
            <br />
            <span className="text-olive">avoid the doctor</span> tomorrow
          </motion.p>

          {/* subtitle */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col items-center space-y-6"
          >
            <span className="text-olive-200 uppercase tracking-[0.3em] text-xs font-bold">
              nature's prescription
            </span>
            <div className="h-16 w-px bg-olive/30" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}