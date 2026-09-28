(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-signal-journey]').forEach((journey) => {
            const steps = Array.from(journey.querySelectorAll('[data-signal-step]'));
            const count = journey.querySelector('[data-signal-count]');

            if (!steps.length) return;

            function setActiveStep(index) {
                const safeIndex = Math.max(0, Math.min(index, steps.length - 1));
                const progress = steps.length > 1 ? (safeIndex / (steps.length - 1)) * 100 : 100;

                journey.style.setProperty('--signal-progress', `${progress}%`);
                steps.forEach((step, stepIndex) => {
                    const isActive = stepIndex === safeIndex;
                    step.classList.toggle('is-active', isActive);

                    if (isActive) {
                        step.setAttribute('aria-current', 'step');
                    } else {
                        step.removeAttribute('aria-current');
                    }
                });

                if (count) {
                    count.textContent = `${String(safeIndex + 1).padStart(2, '0')} / ${String(steps.length).padStart(2, '0')}`;
                }
            }

            if (!('IntersectionObserver' in window)) {
                setActiveStep(0);
                return;
            }

            const observer = new IntersectionObserver((entries) => {
                const visibleSteps = entries
                    .filter((entry) => entry.isIntersecting)
                    .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

                if (!visibleSteps.length) return;
                setActiveStep(steps.indexOf(visibleSteps[0].target));
            }, {
                threshold: [0.35, 0.55, 0.75],
                rootMargin: '-18% 0px -38% 0px'
            });

            steps.forEach((step) => observer.observe(step));
            setActiveStep(0);
        });
    });
})();
