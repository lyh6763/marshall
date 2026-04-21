(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const footerSections = document.querySelectorAll('.footer_section');
        const footerToggles = document.querySelectorAll('.footer_toggle');
        const DESKTOP_BREAKPOINT = 768;

        function setSectionState(section, isActive) {
            const toggle = section.querySelector('.footer_toggle');
            const list = section.querySelector('ul');

            section.classList.toggle('active', isActive);

            if (toggle) {
                toggle.setAttribute('aria-expanded', String(isActive));
            }

            if (list) {
                list.setAttribute('aria-hidden', String(!isActive));
                list.querySelectorAll('a, button, input, select, textarea, [tabindex]').forEach((element) => {
                    if (isActive) {
                        const previousTabindex = element.getAttribute('data-footer-tabindex');

                        if (previousTabindex === '') {
                            element.removeAttribute('tabindex');
                        } else if (previousTabindex !== null) {
                            element.setAttribute('tabindex', previousTabindex);
                        }

                        element.removeAttribute('data-footer-tabindex');
                    } else {
                        if (!element.hasAttribute('data-footer-tabindex')) {
                            element.setAttribute('data-footer-tabindex', element.getAttribute('tabindex') || '');
                        }

                        element.setAttribute('tabindex', '-1');
                    }
                });
            }
        }

        footerToggles.forEach((toggle) => {
            toggle.addEventListener('click', () => {
                if (window.innerWidth >= DESKTOP_BREAKPOINT) return;

                const section = toggle.closest('.footer_section');
                const isActive = section.classList.contains('active');

                footerSections.forEach((item) => {
                    setSectionState(item, false);
                });

                setSectionState(section, !isActive);
            });
        });

        function checkScreenSize() {
            const shouldExpand = window.innerWidth >= DESKTOP_BREAKPOINT;

            footerSections.forEach((section) => {
                setSectionState(section, shouldExpand);
            });
        }

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    });
})();
