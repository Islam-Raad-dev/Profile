export const preloadDigitalCvModal = () => {
  if (typeof window !== 'undefined') {
    import('@/components/ui/DigitalCvModal');
  }
};

export const preloadProjectModal = () => {
  if (typeof window !== 'undefined') {
    import('@/components/sections/projects/ProjectModal');
  }
};

export const preloadAchievementModal = () => {
  if (typeof window !== 'undefined') {
    import('@/components/sections/achievements/AchievementModal');
  }
};

export function scheduleIdle(callback: () => void, timeout = 2500): () => void {
  if (typeof window === 'undefined') return () => {};
  if ('requestIdleCallback' in window) {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(callback, timeout);
  return () => clearTimeout(id);
}
