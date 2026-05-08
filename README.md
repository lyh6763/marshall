# Marshall Brand Website Redesign

Marshall 브랜드의 스토리와 제품, 아티스트, 커뮤니티 콘텐츠를 원페이지 흐름으로 재구성한 포트폴리오 프로젝트입니다.

강한 브랜드 무드를 유지하면서도 모바일 탐색, 스크롤 애니메이션, 푸터 아코디언 같은 인터랙션을 접근성과 성능 관점에서 함께 개선했습니다.

## 프로젝트 개요

- 유형: 개인 포트폴리오 리디자인 프로젝트
- 기간: 2025.12 제작 / 2026.02, 2026.04, 2026.05 품질 개선
- 역할: 원페이지 UX 흐름 및 정보 구조 설계, 반응형 UI 퍼블리싱, Vanilla JS 인터랙션 구현, 접근성/성능/레이아웃 QA 개선
- 산출물: 원페이지 웹사이트, JS 모듈, 반응형 CSS

## 목표

- Marshall 브랜드 스토리를 한 페이지에서 자연스럽게 전달
- About -> Products -> Artists -> Social로 이어지는 서사형 구조 구성
- 모바일에서도 메뉴, 슬라이더, 푸터 탐색이 끊기지 않도록 접근성과 반응형 완성도 개선

## 페이지 구조

- Header: 로고, 주요 메뉴, 언어 전환
- Hero: 슬로건과 리드 문구
- About: 브랜드 소개
- Products: Headphones / Speakers / Amplifiers
- Artists: 아티스트 스토리 섹션
- Social: Heritage / Story / Community 슬라이더와 Partnership 콘텐츠
- Footer: 회사, 고객지원, 계정, 소셜 링크

## 핵심 구현

- `IntersectionObserver` 기반 스크롤 애니메이션과 `unobserve()` 최적화
- 모바일 메뉴 body scroll lock, ESC 닫기, Focus Trap, 포커스 복귀
- 메뉴/푸터 아코디언의 `aria-expanded`, `aria-hidden`, `tabindex` 상태 동기화
- 임시 링크 제거, 공식 목적지 연결, 반복 CTA의 목적별 `aria-label` 보강
- 콘텐츠 이미지 `img/picture` 전환, alt, lazy loading, srcset/sizes, WebP/AVIF fallback 구성
- `prefers-reduced-motion` 대응과 모바일/태블릿/데스크톱 시각 QA

주요 파일: `index.html`, `js/navigation.js`, `js/footer.js`, `js/scroll-animations.js`, `css/marshall.css`, `css/animations.css`, `img/optimized/`

## 기술 스택

- HTML5
- CSS3
- Vanilla JavaScript
- Swiper.js CDN

## 관련 문서

- [프로젝트 기획서](./PROJECT_BRIEF.md)
- [구현 근거 코드 리뷰](./CODE_REVIEW.md)
- [포트폴리오 요약](./docs/PORTFOLIO.md)
