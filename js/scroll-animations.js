/**
 * Marshall - 스크롤 애니메이션
 * Intersection Observer를 사용한 성능 최적화된 스크롤 애니메이션
 */

(function() {
    'use strict';

    // ========================================
    // 설정
    // ========================================

    const config = {
        // Observer 옵션
        threshold: 0.15,           // 요소의 15%가 보이면 트리거
        rootMargin: '0px 0px -50px 0px',  // 뷰포트 하단에서 50px 전에 트리거

        // 애니메이션 클래스
        animationClass: 'is-visible',

        // 한 번만 실행할지 여부
        once: true,

        // 디버그 모드
        debug: false
    };

    const log = (...args) => {
        if (config.debug) {
            console.log(...args);
        }
    };

    const warn = (...args) => {
        if (config.debug) {
            console.warn(...args);
        }
    };

    // ========================================
    // Intersection Observer 설정
    // ========================================

    const observerOptions = {
        threshold: config.threshold,
        rootMargin: config.rootMargin
    };

    // Observer 콜백 함수
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            log('Entry:', {
                target: entry.target,
                isIntersecting: entry.isIntersecting,
                intersectionRatio: entry.intersectionRatio
            });

            // 요소가 뷰포트에 들어왔을 때
            if (entry.isIntersecting) {
                // 애니메이션 클래스 추가
                entry.target.classList.add(config.animationClass);

                log('애니메이션 시작:', entry.target);

                // 한 번만 실행하는 경우 관찰 중지
                if (config.once) {
                    observer.unobserve(entry.target);
                }
            } else {
                // 반복 실행하는 경우 클래스 제거
                if (!config.once) {
                    entry.target.classList.remove(config.animationClass);
                }
            }
        });
    };

    // Observer 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, observerOptions);

    // ========================================
    // 초기화 함수
    // ========================================

    function initScrollAnimations() {
        // 애니메이션 대상 요소 선택
        const animationSelectors = [
            '.scroll-fade-up',
            '.scroll-fade-left',
            '.scroll-fade-right',
            '.scroll-scale',
            '.scroll-slide-in',
            '.scroll-rotate-in',
            '.scroll-blur-in',
            '.stagger-children'
        ];

        // 모든 애니메이션 요소 찾기
        const elements = document.querySelectorAll(animationSelectors.join(', '));

        log('애니메이션 요소 개수:', elements.length);

        // 각 요소를 Observer에 등록
        elements.forEach(element => {
            observer.observe(element);
        });

        log(`✨ ${elements.length}개의 스크롤 애니메이션이 초기화되었습니다.`);
    }

    // ========================================
    // 유틸리티 함수
    // ========================================

    /**
     * 모든 애니메이션을 즉시 표시 (디버깅용)
     */
    window.showAllAnimations = function() {
        const elements = document.querySelectorAll('[class*="scroll-"]');
        elements.forEach(el => {
            el.classList.add(config.animationClass);
        });
        log('모든 애니메이션 표시됨');
    };

    /**
     * 모든 애니메이션 리셋 (디버깅용)
     */
    window.resetAllAnimations = function() {
        const elements = document.querySelectorAll('[class*="scroll-"]');
        elements.forEach(el => {
            el.classList.remove(config.animationClass);
        });
        log('모든 애니메이션 리셋됨');
    };

    /**
     * 특정 요소에 애니메이션 추가
     */
    window.addScrollAnimation = function(selector, animationType = 'fade-up', delay = 0) {
        const element = document.querySelector(selector);
        if (element) {
            element.classList.add(`scroll-${animationType}`);
            if (delay > 0) {
                element.classList.add(`delay-${delay}`);
            }
            observer.observe(element);
            log(`애니메이션 추가됨: ${selector}`);
        } else {
            warn(`요소를 찾을 수 없음: ${selector}`);
        }
    };

    // ========================================
    // 페이지 로드 시 초기화
    // ========================================

    // DOM이 완전히 로드된 후 실행
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollAnimations);
    } else {
        // 이미 로드된 경우 즉시 실행
        initScrollAnimations();
    }

    // 동적으로 추가된 요소를 위한 MutationObserver (선택사항)
    // 필요한 경우 주석 해제
    /*
    const mutationObserver = new MutationObserver(mutations => {
        mutations.forEach(mutation => {
            mutation.addedNodes.forEach(node => {
                if (node.nodeType === 1) { // Element 노드만
                    const animElements = node.querySelectorAll('[class*="scroll-"]');
                    animElements.forEach(el => observer.observe(el));
                }
            });
        });
    });

    mutationObserver.observe(document.body, {
        childList: true,
        subtree: true
    });
    */

    // ========================================
    // 전역 노출 (디버깅용)
    // ========================================

    window.MarshallScrollAnimations = {
        config,
        observer,
        init: initScrollAnimations
    };

    log('🎸 Marshall 스크롤 애니메이션 로드 완료');

})();
