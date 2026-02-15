/**
 * animated brush stroke effect
 * reveals text with a painting-like animation
 * re-animates when scrolling in BOTH directions
 */
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimatedBrushProps {
  children: ReactNode;
  brushColor?: string;
  delay?: number;
}

export default function AnimatedBrush({ 
  children, 
  brushColor = '#8fbc8f',
  delay = 0 
}: AnimatedBrushProps) {
  return (
    <span className="relative inline-block mx-1.5 sm:mx-2">
      {/* brush stroke background - FULLY OPAQUE */}
      <motion.span
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 0.85 }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ 
          duration: 1.4,
          delay,
          ease: [0.43, 0.13, 0.23, 0.96] 
        }}
        style={{ 
          backgroundColor: brushColor,
          transformOrigin: 'left'
        }}
        className="absolute inset-0 -skew-x-12 rounded-lg"
      />
      
      {/* text content */}
      <motion.span
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.6, delay: delay + 0.3 }}
        className="relative z-10 px-2"
      >
        {children}
      </motion.span>
    </span>
  );
}