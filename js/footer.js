(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const footerSections = Array.from(document.querySelectorAll('details.footer_section'));
        const desktopQuery = window.matchMedia('(min-width: 768px)');

        if (!footerSections.length) return;

        function syncLayout() {
            footerSections.forEach((section) => {
                const summary = section.querySelector('summary');

                if (desktopQuery.matches) {
                    section.open = true;
                    summary?.setAttribute('tabindex', '-1');
                } else {
                    section.open = false;
                    summary?.removeAttribute('tabindex');
                }
            });
        }

        footerSections.forEach((section) => {
            const summary = section.querySelector('summary');

            summary?.addEventListener('click', (event) => {
                if (desktopQuery.matches) event.preventDefault();
            });

            section.addEventListener('toggle', () => {
                if (desktopQuery.matches || !section.open) return;

                footerSections.forEach((item) => {
                    if (item !== section) item.open = false;
                });
            });
        });

        syncLayout();
        desktopQuery.addEventListener('change', syncLayout);
    });
})();
