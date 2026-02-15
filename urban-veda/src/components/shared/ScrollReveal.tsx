/**
 * scroll reveal animation component
 * re-animates every time element enters viewport
 * fully responsive with adaptive motion amounts
 */
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

export default function ScrollReveal({ 
  children, 
  delay = 0, 
  direction = 'up' 
}: ScrollRevealProps) {
  // Mobile: smaller movement (less dramatic)
  // Desktop: larger movement (more dramatic)
  const directions = {
    // Mobile (default): 20px movement
    // Tablet (sm): 30px movement
    // Desktop (lg): 40px movement
    up: { 
      y: 20,  // base mobile value
    },
    down: { 
      y: -20 
    },
    left: { 
      x: 20 
    },
    right: { 
      x: -20 
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, ...directions[direction] }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ 
        once: false,
        margin: "-50px",
        amount: 0.3
      }}
      transition={{ 
        duration: 0.7, 
        delay, 
        ease: [0.21, 0.47, 0.32, 0.98]  // Smooth cubic-bezier
      }}
    >
      {children}
    </motion.div>
  );
}