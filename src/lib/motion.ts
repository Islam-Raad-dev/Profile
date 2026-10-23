import type { Variants } from 'motion/react';

export const springNav = {
  type: 'spring',
  damping: 28,
  stiffness: 380,
};

export const CUBIC_EASE = [0.22, 1, 0.36, 1] as const;

export const revealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
    filter: 'blur(8px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: CUBIC_EASE,
    },
  },
};

export const liteRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.35,
      ease: CUBIC_EASE,
    },
  },
};

export const blurFadeVariants: Variants = {
  hidden: {
    opacity: 0,
    filter: 'blur(14px)',
  },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: {
      duration: 0.42,
      ease: CUBIC_EASE,
    },
  },
  exit: {
    opacity: 0,
    filter: 'blur(14px)',
    transition: {
      duration: 0.26,
      ease: CUBIC_EASE,
    },
  },
};

export const reducedMotionVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
};
