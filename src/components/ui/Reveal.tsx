'use client';

import React from 'react';
import { motion } from 'motion/react';
import { revealVariants, reducedMotionVariants, CUBIC_EASE } from '@/lib/motion';
import { useReducedMotion } from '@/lib/media';

interface RevealProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export function Reveal({ children, delay = 0, className = '' }: RevealProps) {
  const reducedMotion = useReducedMotion();

  if (reducedMotion) {
    return (
      <motion.div
        variants={reducedMotionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={revealVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay, ease: CUBIC_EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
