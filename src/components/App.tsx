'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { ScrollLayout } from '@/components/layout/ScrollLayout';
import { useSectionSwitcherLayout } from '@/lib/media';
import { useLang } from '@/lib/i18n';
import { ui } from '@/content/ui';
import { openDigitalCv } from '@/lib/cvNavigation';

const SectionSwitcher = dynamic(
  () => import('./layout/SectionSwitcher').then((mod) => mod.SectionSwitcher),
  { ssr: false }
);

const DigitalCvModal = dynamic(
  () => import('@/components/ui/DigitalCvModal').then((mod) => mod.DigitalCvModal),
  { ssr: false }
);

export function App() {
  const { t } = useLang();
  const isSwitcherLayout = useSectionSwitcherLayout();

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      if (
        window.location.hash === '#cv' ||
        new URLSearchParams(window.location.search).get('cv') === '1'
      ) {
        openDigitalCv();
      }
    }
  }, []);

  return (
    <div className="relative min-h-screen bg-bg text-text selection:bg-accent-soft selection:text-accent-text">
      {isSwitcherLayout ? (
        <SectionSwitcher />
      ) : (
        <>
          <ScrollLayout />
          <footer className="relative py-8 text-center border-t border-border/60 text-xs text-text-muted">
            <p>
              © {new Date().getFullYear()} {t(ui.footer)}
            </p>
          </footer>
        </>
      )}
      <DigitalCvModal />
    </div>
  );
}
