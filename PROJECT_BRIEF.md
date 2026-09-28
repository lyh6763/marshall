# Marshall Live Signal Lab 기획서

## 1. 프로젝트 개요
- 프로젝트명: Marshall Live Signal Lab
- 유형: Marshall 브랜드를 재해석한 제품 탐색 경험 시안
- 기간: 2025.12 시작 / 2026.06 Live Signal Lab 콘셉트 전환
- 역할: 정보 구조 재설계, 반응형 UI 퍼블리싱, Vanilla JS 인터랙션 구현, 접근성 및 화면 QA
- 산출물: 메인 브랜드 경험, 제품군 상세 3종, Case Study, 분리형 CSS, Vanilla JS 모듈, WebP 비주얼 자산

## 2. 배경과 방향
Marshall은 기타 앰프, 무대, 라이브 사운드, 블랙과 골드의 강한 인상이 뚜렷한 브랜드다. 기존 방향이 헤리티지와 제품 소개에 가까웠다면, 이번 브랜치는 무대 장비와 스튜디오 콘솔의 이미지를 현대적인 웹 UI로 재해석하는 데 초점을 둔다.

콘셉트명은 **Live Signal Lab — From Circuit to Crowd**이다. 음악이 입력되고 증폭되어 공기를 움직이고 사람에게 남는 흐름을 `Signal Journey`, `Gear Finder`, `Gear Line`, `Stage Mode`, `Community`로 보여준다.

## 3. 목표
- Marshall의 라이브 에너지와 장비 이미지를 현대적인 스튜디오 무드로 전환
- Vinyl Black 바탕에 Stage Red, Brass, Warm Cream을 사용해 Marshall의 물성을 강조
- 추천, 비교, 상세 페이지로 이어지는 실제 제품 탐색 흐름 구성
- 모바일 메뉴, fixed-on-scroll 헤더, 네이티브 캐러셀, 푸터 아코디언을 안정적으로 동작하게 구성
- 별도 Case Study에서 문제 정의, 의사결정, 접근성, 개선 결과 설명

## 4. 대상 사용자
- 음악, 공연, 오디오 장비에 관심이 있는 사용자
- Marshall의 브랜드 무드를 빠르게 이해하고 싶은 방문자
- 반응형 퍼블리싱, 구조 설계, 인터랙션 완성도를 확인하는 포트폴리오 평가자

## 5. 정보 구조
- Header: 로고, 주요 섹션 링크, 모바일 메뉴
- Hero: Live Signal Lab 콘셉트와 첫 CTA
- Signal Journey: Input / Drive / Air / Crowd 진행형 흐름
- Gear Finder: 사용 환경과 우선 가치 기반 추천
- Gear Line: Headphones / Speakers / Amplifiers 비교와 상세 이동
- Product Detail: 제품군별 역할, 장면, 신호 흐름
- Stage Mode: 라이브 무대와 컨트롤룸 무드
- Community: 팬, 레코드 숍, 백스테이지 문화를 담은 슬라이더
- Footer: 검증된 공식 링크 그룹과 네이티브 모바일 아코디언

## 6. 주요 기능과 인터랙션
- 스크롤 전에는 히어로 위에 자연스럽게 얹히는 absolute 헤더
- 스크롤 후에는 어두운 반투명 fixed 헤더로 전환
- 모바일 메뉴 열기/닫기, ESC 닫기, 포커스 트랩, aria 상태 동기화
- IntersectionObserver 기반 섹션 등장 애니메이션
- Signal Journey 현재 단계와 진행선 동기화
- 장비군 추천과 최대 3개 비교표
- CSS scroll-snap 기반 커뮤니티 캐러셀, 이전/다음 버튼, 키보드 이동, 현재 위치 안내
- 커뮤니티 슬라이드 높이 정규화로 카드 크기 흔들림 방지
- 768 / 1024 / 1920 기준 반응형 CSS 분리

## 7. 디자인 시스템
- 무드: Tactile Amp Panel + Red Stage
- 컬러: Vinyl Black, Stage Red, Brass, Warm Cream
- 타이포그래피: 강한 영문 헤드라인과 짧은 한국어 본문 조합
- 레이아웃: 장비 패널, 신호 라벨, 콘솔 UI를 연상시키는 그리드 구조
- 이미지: 새로 생성한 무대/스튜디오 분위기 비주얼과 기존 제품 이미지를 함께 사용

## 8. 기술 스택
- HTML5
- CSS3
- Vanilla JavaScript
- 외부 라이브러리 없는 네이티브 캐러셀
- WebP 이미지 자산

## 9. 접근성과 반응형 고려
- 메뉴 상태를 `aria-expanded`, `aria-hidden`과 동기화하고 푸터는 네이티브 `<details>` 사용
- 키보드 포커스 이동과 ESC 닫기 지원
- fixed 헤더 상태에서도 모바일 터치 영역과 텍스트 대비 유지
- 모바일, 태블릿, 데스크톱, 1920px 이상에서 히어로/제품/커뮤니티 레이아웃 조정

## 10. QA 기준
- `npm test`로 HTML 구조, 링크, 이미지, CSS brace, JavaScript 문법 통합 확인
- 실제 브라우저에서 모바일 메뉴, ESC, 포커스, 추천·비교, footer accordion, 캐러셀 수동 검증

## 11. 향후 개선
- 실제 배포 URL 확정 후 canonical, sitemap, 절대 OG URL 적용
- 실제 기기 및 스크린리더 수동 테스트
- 콘텐츠 규모가 커질 경우 Astro 또는 CMS 기반 콘텐츠 레이어로 이전
