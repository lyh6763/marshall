# Marshall Live Signal Lab

Marshall의 무대 에너지와 사운드 장비 이미지를 **Neo Studio + Red Stage** 방향으로 재해석한 원페이지 브랜드 시안입니다.

화면 안에서는 포트폴리오 설명문을 덜어내고, 실제 브랜드 사이트처럼 짧고 직접적인 카피를 사용합니다. 구조와 작업 의도는 이 문서와 별도 포트폴리오 정리 단계에서 설명합니다.

## 프로젝트 개요
- 유형: 대체 브랜드 사이트 시안
- 콘셉트: Live Signal Lab
- 방향: 블랙/차콜 기반, Stage Red 포인트, Signal Cyan 보조 포인트
- 역할: 정보 구조 설계, 반응형 퍼블리싱, Vanilla JS 인터랙션, 접근성/QA 개선
- 산출물: HTML/CSS/JS 기반 원페이지 사이트

## 페이지 구조
- Hero: Live Signal Lab 첫 인상과 CTA
- Signal Chain: 소리의 흐름을 스튜디오 UI처럼 구성
- Gear Line: Headphones / Speakers / Amplifiers 제품군
- Stage Mode: 라이브 무대와 컨트롤룸 분위기
- Community: 팬, 백스테이지, 레코드 숍 문화를 담은 캐러셀
- Footer: 링크 그룹, 계정, 소셜, 모바일 아코디언

## 주요 구현
- 스크롤 후 fixed 상태로 전환되는 헤더
- 모바일 내비게이션 오버레이, ESC 닫기, 포커스 트랩
- IntersectionObserver 기반 등장 애니메이션
- Swiper 커뮤니티 캐러셀
- 커뮤니티 슬라이드 높이 정규화
- 768 / 1024 / 1920 기준 반응형 CSS 분리
- WebP 히어로/텍스처 자산 적용

## 기술 스택
- HTML5
- CSS3
- Vanilla JavaScript
- Swiper CDN

## 확인 항목
- JS 문법 검사: `node --check js/*.js`
- HTML 파싱 확인
- UTF-8 replacement character 확인
- 이미지 참조 누락 확인
- 390px, 1440px 화면 스크린샷 확인
- 메뉴, ESC 닫기, 포커스 이동, footer accordion, Swiper 동작 확인
