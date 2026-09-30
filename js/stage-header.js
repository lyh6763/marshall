(function () {
    'use strict';

    const hero = document.querySelector('.stage_hero');
    if (!hero) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    function render() {
        frame = 0;
        if (reducedMotion.matches) {
            hero.style.removeProperty('--stage-pan');
            hero.style.removeProperty('--stage-rise');
            return;
        }
        const distance = Math.min(Math.max(-hero.getBoundingClientRect().top, 0), hero.offsetHeight);
        hero.style.setProperty('--stage-pan', `${Math.min(distance * .035, 24)}px`);
        hero.style.setProperty('--stage-rise', `${-Math.min(distance * .065, 44)}px`);
    }

    function schedule() {
        if (!frame) frame = window.requestAnimationFrame(render);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);
    render();
})();
