(function () {
    'use strict';

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    function formatNumber(value) {
        return String(value).padStart(2, '0');
    }

    function initCarousel(root) {
        const track = root.querySelector('[data-carousel-track]');
        const slides = Array.from(root.querySelectorAll('[data-carousel-slide]'));
        const previousButton = root.querySelector('[data-carousel-prev]');
        const nextButton = root.querySelector('[data-carousel-next]');
        const currentLabel = root.querySelector('[data-carousel-current]');
        const totalLabel = root.querySelector('[data-carousel-total]');

        if (!track || !slides.length || !previousButton || !nextButton) return;

        let currentIndex = 0;
        let scrollFrame = null;

        function updateControls(index) {
            currentIndex = Math.max(0, Math.min(index, slides.length - 1));
            previousButton.disabled = currentIndex === 0;
            nextButton.disabled = currentIndex === slides.length - 1;

            if (currentLabel) currentLabel.textContent = formatNumber(currentIndex + 1);
            if (totalLabel) totalLabel.textContent = formatNumber(slides.length);
        }

        function getSlideOffset(slide) {
            const trackBounds = track.getBoundingClientRect();
            const slideBounds = slide.getBoundingClientRect();
            return slideBounds.left - trackBounds.left + track.scrollLeft;
        }

        function getClosestSlideIndex() {
            return slides.reduce((closestIndex, slide, index) => {
                const closestDistance = Math.abs(getSlideOffset(slides[closestIndex]) - track.scrollLeft);
                const currentDistance = Math.abs(getSlideOffset(slide) - track.scrollLeft);
                return currentDistance < closestDistance ? index : closestIndex;
            }, 0);
        }

        function goTo(index) {
            const nextIndex = Math.max(0, Math.min(index, slides.length - 1));
            track.scrollTo({
                left: getSlideOffset(slides[nextIndex]),
                behavior: reducedMotionQuery.matches ? 'auto' : 'smooth'
            });
            updateControls(nextIndex);
        }

        previousButton.addEventListener('click', () => goTo(currentIndex - 1));
        nextButton.addEventListener('click', () => goTo(currentIndex + 1));

        track.addEventListener('keydown', (event) => {
            const keyActions = {
                ArrowLeft: () => goTo(currentIndex - 1),
                ArrowRight: () => goTo(currentIndex + 1),
                Home: () => goTo(0),
                End: () => goTo(slides.length - 1)
            };

            if (!keyActions[event.key]) return;
            event.preventDefault();
            keyActions[event.key]();
        });

        track.addEventListener('scroll', () => {
            if (scrollFrame) window.cancelAnimationFrame(scrollFrame);
            scrollFrame = window.requestAnimationFrame(() => {
                updateControls(getClosestSlideIndex());
                scrollFrame = null;
            });
        }, { passive: true });

        window.addEventListener('resize', () => updateControls(getClosestSlideIndex()));
        updateControls(0);
    }

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('[data-carousel]').forEach(initCarousel);
    });
})();
