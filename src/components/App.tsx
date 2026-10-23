'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { Toggles } from '@/components/layout/Toggles';
import { ScrollLayout } from '@/components/layout/ScrollLayout';
import { useMediaQuery, useIsMounted, TOUCH_QUERY } from '@/lib/media';
import { useLang } from '@/lib/i18n';
import { ui } from '@/content/ui';

const SectionSwitcher = dynamic(
  () => import('./layout/SectionSwitcher').then((mod) => mod.SectionSwitcher),
  { ssr: false }
);

export function App() {
  const { t } = useLang();
  const mounted = useIsMounted();
  const isTouch = useMediaQuery(TOUCH_QUERY);

  return (
    <div className="relative min-h-screen bg-bg text-text selection:bg-accent-soft selection:text-accent-text">
      {/* Top Corner Preference Toggles */}
      <Toggles />

      {/* Main Layout: ScrollLayout for touch / mobile and SSR, SectionSwitcher for fine-pointer desktop */}
      {!mounted || isTouch ? <ScrollLayout /> : <SectionSwitcher />}

      {/* Quiet Footer */}
      <footer className="py-8 text-center border-t border-border/60 text-xs text-text-muted">
        <p>
          © {new Date().getFullYear()} {t(ui.footer)}
        </p>
      </footer>
    </div>
  );
}
