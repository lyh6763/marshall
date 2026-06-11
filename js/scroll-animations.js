(function () {
    'use strict';

    const config = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
        animationClass: 'is-visible',
        once: true
    };

    const animationSelectors = [
        '.scroll-fade-up',
        '.scroll-fade-left',
        '.scroll-fade-right',
        '.scroll-scale',
        '.scroll-slide-in',
        '.scroll-rotate-in',
        '.scroll-blur-in',
        '.stagger-children'
    ];

    const revealImmediately = () => {
        document.querySelectorAll(animationSelectors.join(', ')).forEach((element) => {
            element.classList.add(config.animationClass);
        });
    };

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', revealImmediately);
        } else {
            revealImmediately();
        }
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) {
                if (!config.once) {
                    entry.target.classList.remove(config.animationClass);
                }
                return;
            }

            entry.target.classList.add(config.animationClass);

            if (config.once) {
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: config.threshold,
        rootMargin: config.rootMargin
    });

    function initScrollAnimations() {
        document.querySelectorAll(animationSelectors.join(', ')).forEach((element) => {
            observer.observe(element);
        });
    }

    window.showAllAnimations = revealImmediately;

    window.resetAllAnimations = function () {
        document.querySelectorAll(animationSelectors.join(', ')).forEach((element) => {
            element.classList.remove(config.animationClass);
            observer.observe(element);
        });
    };

    window.addScrollAnimation = function (selector, animationType = 'fade-up', delay = 0) {
        const element = document.querySelector(selector);
        if (!element) return;

        element.classList.add(`scroll-${animationType}`);
        if (delay > 0) {
            element.classList.add(`delay-${delay}`);
        }
        observer.observe(element);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        initScrollAnimations();
    }

    window.MarshallScrollAnimations = {
        config,
        observer,
        init: initScrollAnimations
    };
})();
