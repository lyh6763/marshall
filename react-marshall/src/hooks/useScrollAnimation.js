import { useEffect } from 'react';

const SELECTOR = '.scroll-fade-up, .scroll-fade-left, .scroll-fade-right, .scroll-scale';

export function useScrollAnimation() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      document.querySelectorAll(SELECTOR).forEach((element) => {
        element.classList.add('is-visible');
      });
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -80px'
      }
    );

    document.querySelectorAll(SELECTOR).forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);
}
