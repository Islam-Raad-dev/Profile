'use client';

import React from 'react';
import { useLang } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { ui } from '@/content/ui';
import { Sun, Moon } from 'lucide-react';

export function Toggles() {
  const { lang, toggleLang, t } = useLang();
  const { theme, toggleTheme } = useTheme();

  return (
    <aside
      aria-label="Preferences"
      className="fixed top-4 end-4 z-40 flex items-center p-1.5 rounded-full bg-card/80 backdrop-blur-glass border border-border shadow-card"
    >
      {/* Language Toggle */}
      <button
        type="button"
        onClick={toggleLang}
        aria-label={t(ui['toggle.lang'])}
        className="px-3 py-1 rounded-full text-xs font-semibold text-text hover:text-accent-text hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent min-w-[36px] min-h-[32px] flex items-center justify-center cursor-pointer"
      >
        {lang === 'en' ? 'عربي' : 'EN'}
      </button>

      <span className="w-px h-4 bg-border mx-1" aria-hidden="true" />

      {/* Theme Toggle */}
      <button
        type="button"
        onClick={toggleTheme}
        aria-label={t(ui['toggle.theme'])}
        className="p-1.5 rounded-full text-text hover:text-accent-text hover:bg-surface transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent w-8 h-8 flex items-center justify-center cursor-pointer"
      >
        {theme === 'dark' ? (
          <Sun className="w-4 h-4 text-accent" />
        ) : (
          <Moon className="w-4 h-4 text-accent-text" />
        )}
      </button>
    </aside>
  );
}
