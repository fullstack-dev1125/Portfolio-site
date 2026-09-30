import { useEffect } from 'react';

/**
 * Adds `is-visible` to every `.reveal` element as it scrolls into view. The
 * hidden starting state only applies under prefers-reduced-motion:
 * no-preference and when <html> has `js-reveal` (set in main.tsx), so content
 * is never hidden for visitors who can't or won't run the animation.
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.reveal:not(.is-visible)');
    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
