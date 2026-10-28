'use client';

import { useSyncExternalStore } from 'react';
import type { SectionId } from '@/types';

let isModalOpen = false;
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function openDigitalCv() {
  isModalOpen = true;
  emitChange();
}

export function closeDigitalCv() {
  isModalOpen = false;
  emitChange();
}

export function useDigitalCvModal() {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => {
        listeners.delete(listener);
      };
    },
    () => isModalOpen,
    () => false
  );
}

export function highlightElement(element: HTMLElement) {
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });

  const highlightClasses = [
    'ring-4',
    'ring-accent',
    'ring-offset-4',
    'ring-offset-bg',
    'shadow-[0_0_35px_rgba(51,149,255,0.7)]',
  ];

  element.classList.add(...highlightClasses);

  setTimeout(() => {
    element.classList.remove(...highlightClasses);
  }, 2600);
}

export function navigateToSectionItem(sectionId: SectionId, elementId?: string) {
  closeDigitalCv();

  if (window.location.hash !== `#${sectionId}`) {
    window.location.hash = sectionId;
  }

  window.dispatchEvent(
    new CustomEvent('app-navigate-section', {
      detail: { sectionId, elementId },
    })
  );

  if (!elementId) return;

  const tryScrollAndHighlight = (attemptsRemaining: number) => {
    const el = document.getElementById(elementId);
    if (el) {
      highlightElement(el);
      return;
    }
    if (attemptsRemaining > 0) {
      setTimeout(() => tryScrollAndHighlight(attemptsRemaining - 1), 120);
    }
  };

  setTimeout(() => {
    tryScrollAndHighlight(8);
  }, 100);
}
