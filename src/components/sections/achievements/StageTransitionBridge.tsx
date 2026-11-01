'use client';

import React from 'react';
import { motion } from 'motion/react';
import { useLang } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface StageTransitionBridgeProps {
  targetTitle: string;
  targetIcon: React.ReactNode;
  direction?: 'down' | 'up';
  onAdvance: () => void;
  scrollAttempt?: number;
}

export function StageTransitionBridge({
  targetTitle,
  targetIcon,
  direction = 'down',
  onAdvance,
  scrollAttempt = 0,
}: StageTransitionBridgeProps) {
  const { t } = useLang();
  const isDown = direction === 'down';

  return (
    <div className={`flex flex-col items-center justify-center ${isDown ? 'mt-14 sm:mt-16' : 'mb-10 sm:mb-12'}`}>
      <button
        type="button"
        onClick={onAdvance}
        className="group relative flex flex-col items-center p-4 sm:p-5 rounded-2xl bg-card border border-border/80 hover:border-accent backdrop-blur-glass shadow-card hover:shadow-xl transition-all duration-300 max-w-md w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-accent/20 via-accent-2/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none -z-10 blur-sm" />

        <div className="flex items-center gap-3 w-full justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-10 h-10 rounded-xl bg-accent-soft border border-[rgba(51,149,255,0.25)] flex items-center justify-center shrink-0 text-accent-text group-hover:scale-110 transition-transform duration-300">
              {targetIcon}
            </div>

            <div className="text-start min-w-0">
              <span className="text-[10px] sm:text-xs font-mono font-semibold uppercase tracking-wider text-text-muted block">
                {isDown ? t(ui['achievements.bridge.next']) : t(ui['achievements.bridge.prev'])}
              </span>
              <p className="text-sm sm:text-base font-bold font-display text-text group-hover:text-accent-text transition-colors truncate">
                {targetTitle}
              </p>
            </div>
          </div>

          <div className="flex flex-col items-center gap-1 shrink-0 ps-3">
            <div className="w-8 h-8 rounded-full bg-surface border border-border flex items-center justify-center text-text-muted group-hover:text-accent-text group-hover:border-accent transition-colors">
              {isDown ? (
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              ) : (
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                >
                  <ChevronUp className="w-4 h-4" />
                </motion.div>
              )}
            </div>

            <div className="flex items-center gap-1">
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  scrollAttempt >= 1
                    ? 'bg-accent scale-125 shadow-[0_0_6px_rgba(51,149,255,0.7)]'
                    : 'bg-text-muted/30'
                }`}
              />
              <span
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  scrollAttempt >= 2
                    ? 'bg-accent scale-125 shadow-[0_0_6px_rgba(51,149,255,0.7)]'
                    : 'bg-text-muted/30'
                }`}
              />
            </div>
          </div>
        </div>

        <div className="w-full pt-2.5 mt-2.5 border-t border-border/60 flex items-center justify-between text-[11px] text-text-muted">
          <span>
            {isDown
              ? t(ui['achievements.bridge.scrollHint'])
              : t(ui['achievements.bridge.scrollHintUp'])}
          </span>
          <span className="font-semibold text-accent-text group-hover:underline">
            {targetTitle} ➔
          </span>
        </div>
      </button>
    </div>
  );
}
