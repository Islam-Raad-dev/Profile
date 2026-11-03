'use client';

import React, { createContext, useContext, useSyncExternalStore } from 'react';
import type { L, Lang } from '@/types';

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (l: L | undefined) => string;
}

const LangContext = createContext<LangContextValue | undefined>(undefined);

function subscribeLang(callback: () => void) {
  window.addEventListener('storage', callback);
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.attributeName === 'lang' || mutation.attributeName === 'dir') {
        callback();
      }
    }
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang', 'dir'],
  });

  return () => {
    window.removeEventListener('storage', callback);
    observer.disconnect();
  };
}

function getLangSnapshot(): Lang {
  const current = document.documentElement.lang;
  return current === 'ar' ? 'ar' : 'en';
}

function getServerLangSnapshot(): Lang {
  return 'en';
}

export function LangProvider({ children }: { children: React.ReactNode }) {
  const lang = useSyncExternalStore(subscribeLang, getLangSnapshot, getServerLangSnapshot);

  const setLang = (nextLang: Lang) => {
    document.documentElement.lang = nextLang;
    document.documentElement.dir = nextLang === 'ar' ? 'rtl' : 'ltr';
    try {
      localStorage.setItem('lang', nextLang);
    } catch {}
  };

  const toggleLang = () => {
    setLang(lang === 'en' ? 'ar' : 'en');
  };

  const t = (l: L | undefined): string => {
    if (!l) return '';
    return l[lang] || l.en || '';
  };

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang(): LangContextValue {
  const context = useContext(LangContext);
  if (!context) {
    throw new Error('useLang must be used within a LangProvider');
  }
  return context;
}
