'use client';

import React from 'react';
import { Toggles } from '@/components/layout/Toggles';
import { ScrollLayout } from '@/components/layout/ScrollLayout';
import { useLang } from '@/lib/i18n';
import { ui } from '@/content/ui';

export function App() {
  const { t } = useLang();

  return (
    <div className="relative min-h-screen bg-bg text-text selection:bg-accent-soft selection:text-accent-text">
      {/* Top Corner Preference Toggles */}
      <Toggles />

      {/* Main Layout */}
      <ScrollLayout />

      {/* Quiet Footer */}
      <footer className="py-8 text-center border-t border-border/60 text-xs text-text-muted">
        <p>
          © {new Date().getFullYear()} {t(ui.footer)}
        </p>
      </footer>
    </div>
  );
}
