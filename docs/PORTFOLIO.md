# Marshall Live Signal Lab 포트폴리오 요약

## 1. 프로젝트 정보
- 프로젝트명: Marshall Live Signal Lab
- 유형: 브랜드 탐색 경험 리디자인 시안
- 콘셉트: From Circuit to Crowd
- 역할: UX 흐름 재설계, 퍼블리싱, 인터랙션 구현, 반응형/접근성 QA
- 기술: HTML5, CSS3, Vanilla JS, CSS scroll-snap

## 2. 문제 정의
기존 원페이지는 강한 분위기를 갖췄지만 17개의 placeholder 링크와 상세 흐름 부재로 사용자가 제품을 본 뒤 할 수 있는 행동이 없었다. cyan 중심의 표현도 Marshall 고유의 물성보다 범용적인 테크 UI에 가까웠다.

## 3. 해결 방향
- `Hero -> Signal Journey -> Gear Finder -> Gear Line -> Stage Mode -> Community -> Footer` 흐름으로 재구성
- 제품군은 추천, 비교, 상세 탐색까지 이어지는 실제 사용자 흐름으로 확장
- 아티스트와 소셜 성격의 중복 콘텐츠를 Community 흐름으로 통합
- 별도 Case Study에서 문제 정의와 의사결정, 결과를 설명

## 4. 디자인 포인트
- `Built to / Move Air` 초대형 실선·윤곽선 타이포로 첫 화면의 인지 차이를 강화
- 회색 카탈로그 컷 대신 Headphones는 집중, Speakers는 공간, Amplifiers는 압력이라는 사용 장면을 직접 보여주는 신규 이미지 4종 제작
- 제품 영역을 스태거드 3열 에디토리얼 카드로 바꿔 장비군의 성격을 한 화면에서 대조
- Vinyl Black과 Warm Cream에 Stage Red, Brass를 결합
- 앰프 패널, 노브, 인쇄물, 오래된 장비의 물성을 반복 가능한 토큰으로 정리
- 장식적인 fade보다 신호 흐름과 현재 위치를 설명하는 모션에 집중
- 카피는 짧은 영문 헤드라인과 자연스러운 한국어 문장으로 정리

## 5. 구현 포인트
- `navigation.js`: 모바일 메뉴, ESC 닫기, 포커스 트랩, fixed 헤더 토글
- `scroll-animations.js`: IntersectionObserver 기반 등장 효과
- `signal-journey.js`: 현재 신호 단계와 진행선 동기화
- `gear-finder.js`: 장비군 추천과 접근 가능한 비교표 생성
- `carousel.js`: Community 캐러셀 버튼, 키보드 이동, 현재 위치 안내
- `footer.js`: 네이티브 `<details>` 기반 모바일 푸터 아코디언 보조
- CSS 브레이크포인트: 기본 / 768 / 1024 / 1920

## 6. 검증
- `npm test` 무의존성 자동 검증 통과
- 5 HTML / 7 CSS / 6 JS 문법·구조·참조 검사
- placeholder 링크 17개에서 0개로 정리
- 제품 상세 3개와 Case Study 추가

## 7. 다음 개선 후보
- 실제 배포 URL 확정 후 canonical, sitemap, 절대 OG URL 적용
- 실제 기기와 스크린리더를 이용한 수동 회귀 테스트
- 제품 API 또는 CMS가 필요해질 때 정적 데이터 구조를 콘텐츠 레이어로 이전
