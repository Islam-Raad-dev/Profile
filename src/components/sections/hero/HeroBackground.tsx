'use client';

import React from 'react';
import { motion, type Variants } from 'motion/react';
import { useReducedMotion } from '@/lib/media';
import { NeuralGrid } from './NeuralGrid';

interface HeroBackgroundProps {
  isFirstVisit?: boolean;
}

export function HeroBackground({ isFirstVisit = true }: HeroBackgroundProps) {
  const reducedMotion = useReducedMotion();

  const glowVariants: Variants = {
    initial: {
      scale: isFirstVisit && !reducedMotion ? 0.8 : 1,
      opacity: isFirstVisit && !reducedMotion ? 0 : 1,
    },
    animate: {
      scale: [1, 1.06, 1],
      opacity: 1,
      transition: {
        scale: {
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
        opacity: {
          duration: 0.8,
          ease: 'easeOut',
        },
      },
    },
  };

  const orbitRotateClockwise: Variants = {
    animate: {
      rotate: reducedMotion ? 0 : 360,
      transition: {
        duration: 90,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  const orbitRotateCounter: Variants = {
    animate: {
      rotate: reducedMotion ? 0 : -360,
      transition: {
        duration: 120,
        repeat: Infinity,
        ease: 'linear',
      },
    },
  };

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 overflow-hidden pointer-events-none -z-10 select-none flex items-center justify-center"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--surface)_0%,transparent_70%)]" />

      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute w-[28rem] sm:w-[36rem] md:w-[44rem] h-[28rem] sm:h-[36rem] md:h-[44rem] rounded-full bg-accent/20 dark:bg-accent/25 blur-[100px] md:blur-[140px] -translate-y-8"
      />
      <motion.div
        variants={glowVariants}
        initial="initial"
        animate="animate"
        className="absolute w-[22rem] sm:w-[28rem] h-[22rem] sm:h-[28rem] rounded-full bg-accent-2/15 dark:bg-accent-2/20 blur-[90px] md:blur-[120px] translate-x-12 translate-y-4"
      />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] hidden sm:flex items-center justify-center opacity-40 dark:opacity-30 [mask-image:radial-gradient(circle,black_50%,transparent_85%)]">
        <motion.svg
          variants={orbitRotateClockwise}
          animate="animate"
          className="w-full h-full absolute inset-0"
          viewBox="0 0 600 600"
        >
          <circle
            cx="300"
            cy="300"
            r="230"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="1.2"
            strokeDasharray="6 14"
            opacity="0.4"
          />
          <circle cx="530" cy="300" r="3" fill="var(--accent)" opacity="0.8" />
          <circle cx="70" cy="300" r="3" fill="var(--accent)" opacity="0.8" />
        </motion.svg>

        <motion.svg
          variants={orbitRotateCounter}
          animate="animate"
          className="w-full h-full absolute inset-0"
          viewBox="0 0 600 600"
        >
          <circle
            cx="300"
            cy="300"
            r="280"
            fill="none"
            stroke="var(--accent-2)"
            strokeWidth="1"
            strokeDasharray="4 20"
            opacity="0.3"
          />
          <circle cx="300" cy="20" r="2.5" fill="var(--accent-2)" opacity="0.7" />
          <circle cx="300" cy="580" r="2.5" fill="var(--accent-2)" opacity="0.7" />
        </motion.svg>
      </div>

      <NeuralGrid />
    </div>
  );
}
