'use client';

import React, { useRef, useCallback } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, type Variants } from 'motion/react';
import { useReducedMotion, useMediaQuery, TOUCH_QUERY } from '@/lib/media';

interface HeroPhotoProps {
  alt: string;
  isFirstVisit?: boolean;
  className?: string;
}

export function HeroPhoto({
  alt,
  isFirstVisit = true,
  className = 'relative z-10 shrink-0 w-64 md:w-72 lg:w-80 xl:w-96 h-80 md:h-[400px] lg:h-[450px] -mx-6 md:-mx-8 lg:-mx-12 select-none group',
}: HeroPhotoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useMediaQuery(TOUCH_QUERY);

  const rawMouseX = useMotionValue(0);
  const rawMouseY = useMotionValue(0);

  const smoothX = useSpring(rawMouseX, { stiffness: 120, damping: 20 });
  const smoothY = useSpring(rawMouseY, { stiffness: 120, damping: 20 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || isTouch || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const offsetX = (e.clientX - centerX) / (rect.width / 2);
      const offsetY = (e.clientY - centerY) / (rect.height / 2);

      rawMouseX.set(offsetX * 6);
      rawMouseY.set(offsetY * 6);
    },
    [reducedMotion, isTouch, rawMouseX, rawMouseY]
  );

  const handleMouseLeave = useCallback(() => {
    rawMouseX.set(0);
    rawMouseY.set(0);
  }, [rawMouseX, rawMouseY]);

  const entranceVariants: Variants = {
    initial: {
      scale: isFirstVisit && !reducedMotion ? 0.9 : 1,
      y: isFirstVisit && !reducedMotion ? 24 : 0,
      opacity: isFirstVisit && !reducedMotion ? 0 : 1,
      filter: isFirstVisit && !reducedMotion ? 'blur(12px)' : 'none',
    },
    animate: {
      scale: 1,
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: reducedMotion ? 0.2 : 0.75,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  const idleFloatVariants: Variants = {
    animate: {
      y: reducedMotion ? 0 : [-3, 3, -3],
      transition: {
        duration: 5,
        repeat: Infinity,
        repeatType: 'mirror',
        ease: 'easeInOut',
      },
    },
  };

  const auraGlowVariants: Variants = {
    initial: {
      scale: isFirstVisit && !reducedMotion ? 0.6 : 1,
      opacity: isFirstVisit && !reducedMotion ? 0 : 0.8,
    },
    animate: {
      scale: [1, 1.1, 1],
      opacity: [0.75, 0.95, 0.75],
      transition: {
        scale: {
          duration: 4.5,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        },
        opacity: {
          duration: 4.5,
          repeat: Infinity,
          repeatType: 'mirror',
          ease: 'easeInOut',
        },
      },
    },
  };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      variants={entranceVariants}
      initial="initial"
      animate="animate"
      className={className}
    >
      <motion.div
        variants={auraGlowVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-0 bg-accent/30 dark:bg-accent/40 blur-3xl rounded-full scale-110 pointer-events-none"
      />

      <motion.div
        variants={auraGlowVariants}
        initial="initial"
        animate="animate"
        className="absolute inset-x-4 inset-y-12 bg-accent-2/20 dark:bg-accent-2/25 blur-2xl rounded-full pointer-events-none"
      />

      <motion.div
        variants={idleFloatVariants}
        animate="animate"
        style={{
          x: isTouch ? 0 : smoothX,
          y: isTouch ? 0 : smoothY,
        }}
        className="relative w-full h-full [mask-image:linear-gradient(to_bottom,black_85%,transparent_100%)] will-change-transform"
      >
        <Image
          src="/images/islam.png"
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 384px, 320px"
          className="object-contain object-bottom drop-shadow-[0_20px_35px_rgba(0,0,0,0.5)] transition-transform duration-300 group-hover:scale-[1.01]"
        />
      </motion.div>
    </motion.div>
  );
}
