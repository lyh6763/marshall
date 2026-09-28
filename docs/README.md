# Marshall Live Signal Lab

Marshall의 무대 에너지와 사운드 장비 이미지를 **From Circuit to Crowd** 방향으로 재해석한 브랜드 경험 시안입니다.

화면 안에서는 포트폴리오 설명문을 덜어내고, 실제 브랜드 사이트처럼 짧고 직접적인 카피를 사용합니다. 구조와 작업 의도는 이 문서와 별도 포트폴리오 정리 단계에서 설명합니다.

## 프로젝트 개요
- 유형: 대체 브랜드 사이트 시안
- 콘셉트: Live Signal Lab
- 방향: Vinyl Black 기반, Stage Red와 Brass, Warm Cream 포인트
- 역할: 정보 구조 설계, 반응형 퍼블리싱, Vanilla JS 인터랙션, 접근성/QA 개선
- 산출물: 메인 경험, 제품군 상세 3종, 포트폴리오 Case Study

## 페이지 구조
- Hero: Live Signal Lab 첫 인상과 CTA
- Art direction: 백스테이지·리스닝룸·클럽 무대를 하나의 레드/브라스 에디토리얼 이미지 시스템으로 연결
- Signal Journey: Input / Drive / Air / Crowd 흐름과 스크롤 진행 상태
- Gear Line: 사용 장면 기반 추천과 Headphones / Speakers / Amplifiers 비교
- Product Detail: 제품군별 역할, 장면, 신호 흐름
- Stage Mode: 라이브 무대와 컨트롤룸 분위기
- Community: 팬, 백스테이지, 레코드 숍 문화를 담은 캐러셀
- Footer: 공식 링크 그룹, 제품 등록, 모바일 아코디언
- Case Study: 문제 정의, 디자인 결정, 접근성, 구조 개선 결과

## 주요 구현
- 스크롤 후 fixed 상태로 전환되는 헤더
- 모바일 내비게이션 오버레이, ESC 닫기, 포커스 트랩
- IntersectionObserver 기반 등장 애니메이션
- IntersectionObserver 기반 Signal Journey 진행 상태
- 사용 환경·우선 가치 기반 장비군 추천과 비교표
- CSS scroll-snap 기반 커뮤니티 캐러셀과 버튼/키보드 이동
- 커뮤니티 슬라이드 높이 정규화
- 768 / 1024 / 1920 기준 반응형 CSS 분리
- WebP 히어로/텍스처 자산 적용
- Hero preload와 상세 페이지 LCP 이미지 우선순위 지정

## 기술 스택
- HTML5
- CSS3
- Vanilla JavaScript
- Node.js 기반 무의존성 자동 검증 스크립트

## 확인 항목
- 전체 검사: `npm test`
- HTML H1/main/ID/fragment/placeholder 검사
- 이미지 alt, width/height, 로컬 파일과 srcset 참조 검사
- CSS brace와 전체 JavaScript 문법 검사
- 수동 QA 대상: 메뉴, ESC, 포커스, 추천·비교, footer accordion, 캐러셀
