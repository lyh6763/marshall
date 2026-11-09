(function () {
    'use strict';

    const header = document.querySelector('.stage_header');
    const hero = document.querySelector('.stage_hero');
    if (!header && !hero) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    // 스크롤 연동 CSS를 지원하면 첫 화면 움직임은 stage-header.css의 animation-timeline이 맡는다.
    // 이때 스크립트는 머리글 고정(position이 바뀌어 CSS 애니메이션으로 옮길 수 없음)만 처리한다.
    const cssDrivesHero = Boolean(window.CSS && CSS.supports && CSS.supports('animation-timeline: scroll()'));
    const heroByScript = hero && !cssDrivesHero;
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
        if (heroByScript && !frame) frame = window.requestAnimationFrame(render);
    }

    window.addEventListener('scroll', schedule, { passive: true });
    if (heroByScript) {
        window.addEventListener('resize', schedule);
        reducedMotion.addEventListener('change', schedule);
    }
    if (header) renderHeader();
    if (heroByScript) render();
})();
