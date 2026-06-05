import { useEffect } from 'react';

const SELECTOR = '.scroll-fade-up, .scroll-fade-left, .scroll-fade-right, .scroll-scale';

export function useScrollAnimation() {
  useEffect(() => {
    const revealReducedMotionTargets = () => {
      document.querySelectorAll(SELECTOR).forEach((element) => {
        element.classList.add('is-visible');
      });
    };

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      revealReducedMotionTargets();

      const mutationObserver = new MutationObserver(revealReducedMotionTargets);
      mutationObserver.observe(document.body, {
        attributes: true,
        childList: true,
        subtree: true,
        attributeFilter: ['class']
      });

      return () => mutationObserver.disconnect();
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

    const observeTargets = () => {
      document.querySelectorAll(`${SELECTOR}:not(.is-visible)`).forEach((element) => {
        observer.observe(element);
      });
    };

    observeTargets();

    const mutationObserver = new MutationObserver(observeTargets);
    mutationObserver.observe(document.body, {
      attributes: true,
      childList: true,
      subtree: true,
      attributeFilter: ['class']
    });

    return () => {
      mutationObserver.disconnect();
      observer.disconnect();
    };
  }, []);
}
