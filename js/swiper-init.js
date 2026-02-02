(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const swiperRoot = document.querySelector('.swiper');
        if (!swiperRoot) return;

        new Swiper('.swiper', {
            direction: 'horizontal',
            slidesPerGroup: 1,
            freeMode: false,
            mousewheel: true,
            loop: false,
            slidesPerView: 1,
            spaceBetween: 30,

            scrollbar: {
                el: '.swiper-scrollbar',
                hide: false,
                draggable: true,
                snapOnRelease: true,
                dragSize: 80,
                dragClass: 'swiper-scrollbar-drag',
                horizontalClass: 'swiper-scrollbar-horizontal'
            }
        });
    });
})();
