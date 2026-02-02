(function () {
    'use strict';

    const BREAKPOINT = 1024;
    const NAV_OPEN_CLASS = 'is-open';
    const NAV_VISIBLE_CLASS = 'is-visible';
    const FOCUSABLE_SELECTOR = 'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const isDesktop = () => window.innerWidth >= BREAKPOINT;
    const isMobile = () => !isDesktop();

    function getFocusableElements(container) {
        return Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR)).filter((element) => {
            if (element.hasAttribute('disabled')) return false;
            return element.getAttribute('aria-hidden') !== 'true';
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const nav = document.querySelector('nav');
        const menuBtn = document.querySelector('.header_center .btn');
        const closeBtn = document.querySelector('.nav_wrap .close_btn');

        if (!nav || !menuBtn || !closeBtn) return;

        let isMenuOpen = false;
        let lastFocused = null;
        let closeTimer = null;

        function syncA11y() {
            const navVisible = isDesktop() || (isMobile() && isMenuOpen);
            menuBtn.setAttribute('aria-expanded', String(isMenuOpen && isMobile()));
            nav.setAttribute('aria-hidden', String(!navVisible));
        }

        function openMenu() {
            if (!isMobile() || isMenuOpen) return;
            isMenuOpen = true;
            lastFocused = document.activeElement;

            nav.classList.add(NAV_OPEN_CLASS);
            requestAnimationFrame(() => {
                nav.classList.add(NAV_VISIBLE_CLASS);
            });

            document.body.style.overflow = 'hidden';
            syncA11y();

            document.addEventListener('keydown', onKeydown);
            document.addEventListener('keydown', trapFocus);

            window.setTimeout(() => {
                closeBtn.focus();
            }, 300);
        }

        function finishClose() {
            nav.classList.remove(NAV_OPEN_CLASS);
        }

        function closeMenu({ restoreFocus = true } = {}) {
            if (!isMobile() || !isMenuOpen) return;
            isMenuOpen = false;

            nav.classList.remove(NAV_VISIBLE_CLASS);
            document.body.style.overflow = '';
            syncA11y();

            document.removeEventListener('keydown', onKeydown);
            document.removeEventListener('keydown', trapFocus);

            const onTransitionEnd = (event) => {
                if (event.target !== nav) return;
                nav.removeEventListener('transitionend', onTransitionEnd);
                finishClose();
            };

            nav.addEventListener('transitionend', onTransitionEnd);

            window.clearTimeout(closeTimer);
            closeTimer = window.setTimeout(finishClose, 350);

            if (restoreFocus) {
                const target = lastFocused || menuBtn;
                if (target && typeof target.focus === 'function') {
                    target.focus();
                }
            }
        }

        function toggleMenu() {
            if (isMenuOpen) {
                closeMenu();
            } else {
                openMenu();
            }
        }

        function onKeydown(event) {
            if (event.key === 'Escape') {
                closeMenu();
            }
        }

        function trapFocus(event) {
            if (event.key !== 'Tab' || !isMenuOpen || !isMobile()) return;

            const focusables = getFocusableElements(nav);
            if (!focusables.length) return;

            const first = focusables[0];
            const last = focusables[focusables.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

        menuBtn.addEventListener('click', (event) => {
            event.preventDefault();
            toggleMenu();
        });

        closeBtn.addEventListener('click', (event) => {
            event.preventDefault();
            closeMenu();
        });

        nav.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (link && isMobile() && isMenuOpen) {
                closeMenu({ restoreFocus: false });
            }
        });

        let resizeTimer = null;
        window.addEventListener('resize', () => {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(() => {
                if (isDesktop()) {
                    isMenuOpen = false;
                    nav.classList.remove(NAV_OPEN_CLASS, NAV_VISIBLE_CLASS);
                    document.body.style.overflow = '';
                } else if (!isMenuOpen) {
                    nav.classList.remove(NAV_OPEN_CLASS, NAV_VISIBLE_CLASS);
                }
                syncA11y();
            }, 200);
        });

        if (isDesktop()) {
            nav.classList.remove(NAV_OPEN_CLASS, NAV_VISIBLE_CLASS);
        }
        syncA11y();
    });
})();
