'use client';

import { useLang } from '@/lib/i18n';
import { useTheme } from '@/lib/theme';
import { Sun, Moon, Languages } from 'lucide-react';
import Image from 'next/image';

export default function Home() {
  const { lang, toggleLang } = useLang();
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <div className="w-full max-w-md p-8 rounded-2xl bg-card border border-border shadow-card backdrop-blur-glass flex flex-col items-center gap-6">
        <div className="w-16 h-16 relative">
          <Image
            src="/icon.svg"
            alt="Islam Raad Monogram"
            width={64}
            height={64}
            className="rounded-xl shadow-md"
            priority
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold font-display uppercase tracking-wide text-text mb-2">
            {lang === 'en' ? 'Islam Raad' : 'إسلام رعد'}
          </h1>
          <p className="text-accent-text font-medium text-sm">
            {lang === 'en'
              ? 'Phase 0: Foundation Complete'
              : 'المرحلة 0: اكتمال البنية التأسيسية'}
          </p>
        </div>

        <p className="text-text-muted text-sm max-w-sm">
          {lang === 'en'
            ? 'Bilingual Next.js static site setup with Tailwind CSS v4, tokens, Google Fonts, and zero-flash persistence.'
            : 'إعداد موقع Next.js ثنائي اللغة وثابت مع Tailwind CSS v4 والرموز والخطوط والتوافق الكامل مع اتجاه RTL.'}
        </p>

        <div className="flex items-center gap-3 w-full justify-center pt-2">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-text hover:border-accent hover:text-accent-text transition-colors cursor-pointer text-sm font-medium"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="w-4 h-4 text-accent" />
                <span>{lang === 'en' ? 'Light mode' : 'الوضع الفاتح'}</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-accent-text" />
                <span>{lang === 'en' ? 'Dark mode' : 'الوضع الداكن'}</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={toggleLang}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-border bg-surface text-text hover:border-accent hover:text-accent-text transition-colors cursor-pointer text-sm font-medium"
            aria-label="Toggle language"
          >
            <Languages className="w-4 h-4 text-accent" />
            <span>{lang === 'en' ? 'عربي' : 'English'}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
