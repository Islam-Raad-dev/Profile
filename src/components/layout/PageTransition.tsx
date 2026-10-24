'use client';

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence, type Variants } from 'motion/react';
import { useReducedMotion, useIsMounted } from '@/lib/media';

interface PageTransitionProps {
  isTransitioning: boolean;
  targetSectionName: string;
  direction: number;
  isRTL: boolean;
  onCurtainCovered: () => void;
  onTransitionComplete: () => void;
}

export function PageTransition({
  isTransitioning,
  targetSectionName,
  direction,
  isRTL,
  onCurtainCovered,
  onTransitionComplete,
}: PageTransitionProps) {
  const reducedMotion = useReducedMotion();
  const mounted = useIsMounted();
  const coveredCalledRef = useRef(false);

  useEffect(() => {
    if (isTransitioning) {
      coveredCalledRef.current = false;

      if (reducedMotion) {
        onCurtainCovered();
        const timeout = setTimeout(() => {
          onTransitionComplete();
        }, 120);
        return () => clearTimeout(timeout);
      }

      const coveredTimer = setTimeout(() => {
        if (!coveredCalledRef.current) {
          coveredCalledRef.current = true;
          onCurtainCovered();
        }
      }, 260);

      const completeTimer = setTimeout(() => {
        onTransitionComplete();
      }, 920);

      return () => {
        clearTimeout(coveredTimer);
        clearTimeout(completeTimer);
      };
    }
  }, [isTransitioning, reducedMotion, onCurtainCovered, onTransitionComplete]);

  if (!mounted || typeof document === 'undefined') {
    return null;
  }

  const effectiveDirection = direction * (isRTL ? -1 : 1);
  const slideAxis = effectiveDirection >= 0 ? 1 : -1;

  const curtainVariants: Variants = {
    initial: {
      clipPath:
        slideAxis > 0
          ? 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)'
          : 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)',
    },
    animate: {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      transition: {
        duration: 0.28,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    exit: {
      clipPath:
        slideAxis > 0
          ? 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)'
          : 'polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)',
      transition: {
        duration: 0.26,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  const characters = targetSectionName.split('');
  const isArabic = isRTL;

  return createPortal(
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          key="page-transition-curtain"
          initial={reducedMotion ? { opacity: 0 } : 'initial'}
          animate={reducedMotion ? { opacity: 1 } : 'animate'}
          exit={reducedMotion ? { opacity: 0 } : 'exit'}
          variants={reducedMotion ? undefined : curtainVariants}
          transition={reducedMotion ? { duration: 0.15 } : undefined}
          aria-hidden="true"
          className="fixed inset-0 z-[1000] flex items-center justify-center overflow-hidden bg-bg/90 backdrop-blur-2xl pointer-events-auto select-none"
        >
          <div className="absolute w-[28rem] h-[28rem] rounded-full bg-accent/10 blur-3xl pointer-events-none -translate-x-1/4 -translate-y-1/4" />

          <div className="relative flex items-center justify-center w-full px-6">
            <svg
              className="w-full h-40 max-w-4xl overflow-visible"
              viewBox="0 0 1000 240"
              preserveAspectRatio="xMidYMid meet"
            >
              <text
                x="50%"
                y="50%"
                dominantBaseline="central"
                textAnchor="middle"
                className={`font-bold tracking-wide select-none ${
                  isArabic ? 'font-[family-name:var(--font-cairo)]' : 'font-[family-name:var(--font-caveat)]'
                }`}
                style={{
                  fontSize: isArabic ? '76px' : '96px',
                  paintOrder: 'stroke fill',
                }}
              >
                {isArabic ? (
                  <tspan
                    className="arabic-handwriting-path"
                    style={{
                      fill: 'transparent',
                      stroke: 'var(--text)',
                      strokeWidth: 2,
                      strokeLinecap: 'round',
                      strokeLinejoin: 'round',
                    }}
                  >
                    {targetSectionName}
                  </tspan>
                ) : (
                  characters.map((char, index) => {
                    if (char === ' ') {
                      return <tspan key={index}> </tspan>;
                    }
                    return (
                      <tspan
                        key={index}
                        className="letter-handwriting-path"
                        style={
                          {
                            '--char-idx': index,
                            fill: 'transparent',
                            stroke: 'var(--text)',
                            strokeWidth: 2,
                            strokeLinecap: 'round',
                            strokeLinejoin: 'round',
                          } as React.CSSProperties
                        }
                      >
                        {char}
                      </tspan>
                    );
                  })
                )}
              </text>
            </svg>
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
