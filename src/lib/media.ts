'use client';

import { useState, useEffect, useSyncExternalStore } from 'react';

export const PHONE_QUERY = '(max-width: 767px)';
export const TOUCH_QUERY = '(max-width: 767px), (any-pointer: coarse)';
export const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export function useIsMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  return mounted;
}

export function useMediaQuery(query: string): boolean {
  const subscribe = (callback: () => void) => {
    const media = window.matchMedia(query);
    media.addEventListener('change', callback);
    return () => media.removeEventListener('change', callback);
  };

  const getSnapshot = () => {
    return window.matchMedia(query).matches;
  };

  const getServerSnapshot = () => {
    return false;
  };

  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

export function useReducedMotion(): boolean {
  return useMediaQuery(REDUCED_MOTION_QUERY);
}

export function useSectionSwitcherLayout(): boolean {
  const mounted = useIsMounted();
  const isTouch = useMediaQuery(TOUCH_QUERY);
  return mounted && !isTouch;
}
