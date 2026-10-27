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
        const menuPanel = nav?.querySelector('.nav_wrap');

        if (!nav || !menuBtn || !closeBtn || !menuPanel) return;

        let isMenuOpen = false;
        let lastFocused = null;
        let closeTimer = null;
        let closeTransitionHandler = null;
        let openFrame = null;
        let previousBodyOverflow = '';
        const backgroundStates = new Map();

        function clearOpenFrame() {
            if (openFrame !== null) window.cancelAnimationFrame(openFrame);
            openFrame = null;
        }

        function setBackgroundInert(inactive) {
            if (!inactive) {
                backgroundStates.forEach((wasInert, element) => {
                    element.inert = wasInert;
                });
                backgroundStates.clear();
                return;
            }

            // 메뉴의 조상은 유지하고, 각 단계에서 메뉴 바깥의 형제만 비활성화한다.
            let branch = nav;
            while (branch && branch !== document.body) {
                const parent = branch.parentElement;
                if (!parent) break;
                Array.from(parent.children).forEach((element) => {
                    if (element === branch || !(element instanceof HTMLElement)) return;
                    if (['SCRIPT', 'STYLE', 'LINK', 'META'].includes(element.tagName)) return;
                    if (!backgroundStates.has(element)) backgroundStates.set(element, element.inert);
                    element.inert = true;
                });
                branch = parent;
            }
        }

        function syncA11y() {
            const navVisible = isDesktop() || (isMobile() && isMenuOpen);
            menuBtn.setAttribute('aria-expanded', String(isMenuOpen && isMobile()));
            nav.setAttribute('aria-hidden', String(!navVisible));
            // nav 랜드마크를 보존하고 안쪽 컨테이너에만 모달 의미를 부여한다.
            if (isMenuOpen && isMobile()) {
                menuPanel.setAttribute('role', 'dialog');
                menuPanel.setAttribute('aria-modal', 'true');
                menuPanel.setAttribute('aria-label', '주요 메뉴');
            } else {
                menuPanel.removeAttribute('role');
                menuPanel.removeAttribute('aria-modal');
                menuPanel.removeAttribute('aria-label');
            }
        }

        function openMenu() {
            if (!isMobile() || isMenuOpen) return;
            window.clearTimeout(closeTimer);
            closeTimer = null;
            clearOpenFrame();
            if (closeTransitionHandler) {
                nav.removeEventListener('transitionend', closeTransitionHandler);
                closeTransitionHandler = null;
            }

            isMenuOpen = true;
            lastFocused = document.activeElement;
            previousBodyOverflow = document.body.style.overflow;

            nav.classList.add(NAV_OPEN_CLASS);
            openFrame = window.requestAnimationFrame(() => {
                openFrame = null;
                if (!isMenuOpen || !isMobile()) return;
                nav.classList.add(NAV_VISIBLE_CLASS);
                closeBtn.focus({ preventScroll: true });
                setBackgroundInert(true);
            });

            document.body.style.overflow = 'hidden';
            syncA11y();

            document.addEventListener('keydown', onKeydown);
            document.addEventListener('keydown', trapFocus);
        }

        function finishClose() {
            window.clearTimeout(closeTimer);
            if (closeTransitionHandler) nav.removeEventListener('transitionend', closeTransitionHandler);
            nav.classList.remove(NAV_OPEN_CLASS);
            closeTransitionHandler = null;
            closeTimer = null;
        }

        function closeMenu({ restoreFocus = true } = {}) {
            if (!isMobile() || !isMenuOpen) return;
            isMenuOpen = false;
            clearOpenFrame();
            setBackgroundInert(false);

            if (restoreFocus) {
                const target = lastFocused || menuBtn;
                if (target && typeof target.focus === 'function') {
                    target.focus({ preventScroll: true });
                }
            }

            nav.classList.remove(NAV_VISIBLE_CLASS);
            document.body.style.overflow = previousBodyOverflow;
            syncA11y();

            document.removeEventListener('keydown', onKeydown);
            document.removeEventListener('keydown', trapFocus);

            if (closeTransitionHandler) {
                nav.removeEventListener('transitionend', closeTransitionHandler);
            }

            closeTransitionHandler = (event) => {
                if (event.target !== nav) return;
                finishClose();
            };

            nav.addEventListener('transitionend', closeTransitionHandler);

            window.clearTimeout(closeTimer);
            closeTimer = window.setTimeout(finishClose, 350);
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

            if (!nav.contains(document.activeElement)) {
                event.preventDefault();
                (event.shiftKey ? last : first).focus();
            } else if (event.shiftKey && document.activeElement === first) {
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
                const wasMenuOpen = isMenuOpen;
                const focusWasInMenu = nav.contains(document.activeElement);
                if (isDesktop()) {
                    isMenuOpen = false;
                    window.clearTimeout(closeTimer);
                    closeTimer = null;
                    clearOpenFrame();
                    setBackgroundInert(false);
                    document.removeEventListener('keydown', onKeydown);
                    document.removeEventListener('keydown', trapFocus);
                    if (closeTransitionHandler) {
                        nav.removeEventListener('transitionend', closeTransitionHandler);
                        closeTransitionHandler = null;
                    }
                    nav.classList.remove(NAV_OPEN_CLASS, NAV_VISIBLE_CLASS);
                    if (wasMenuOpen) document.body.style.overflow = previousBodyOverflow;
                } else if (!isMenuOpen) {
                    nav.classList.remove(NAV_OPEN_CLASS, NAV_VISIBLE_CLASS);
                }
                syncA11y();
                if (focusWasInMenu && !isMenuOpen && (wasMenuOpen || isMobile())) {
                    const target = isDesktop() ? nav.querySelector('.nav_body a') : menuBtn;
                    target?.focus({ preventScroll: true });
                }
            }, 200);
        });

        if (isDesktop()) {
            nav.classList.remove(NAV_OPEN_CLASS, NAV_VISIBLE_CLASS);
        }
        syncA11y();
    });
})();
