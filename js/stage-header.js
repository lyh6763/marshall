(function () {
    'use strict';

    const header = document.querySelector('.stage_header');
    const hero = document.querySelector('.stage_hero');
    if (!header && !hero) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;

    function renderHeader() {
        header.classList.toggle('is-fixed', window.scrollY > 80);
    }

    function renderHero() {
        if (reducedMotion.matches) {
            hero.style.removeProperty('--stage-pan');
            hero.style.removeProperty('--stage-rise');
            return;
        }
        const distance = Math.min(Math.max(-hero.getBoundingClientRect().top, 0), hero.offsetHeight);
        hero.style.setProperty('--stage-pan', `${Math.min(distance * .035, 24)}px`);
        hero.style.setProperty('--stage-rise', `${-Math.min(distance * .065, 44)}px`);
    }

    function render() {
        frame = 0;
        renderHero();
    }

    function schedule() {
        if (header) renderHeader();
        if (hero && !frame) frame = window.requestAnimationFrame(render);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    reducedMotion.addEventListener('change', schedule);
    if (header) renderHeader();
    if (hero) render();
})();
