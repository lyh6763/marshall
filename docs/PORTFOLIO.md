# Marshall Live Signal Lab 포트폴리오 요약

## 1. 프로젝트 정보
- 프로젝트명: Marshall Live Signal Lab
- 유형: 브랜드 원페이지 리디자인 시안
- 콘셉트: Neo Studio + Red Stage
- 역할: UX 흐름 재설계, 퍼블리싱, 인터랙션 구현, 반응형/접근성 QA
- 기술: HTML5, CSS3, Vanilla JS, Swiper

## 2. 문제 정의
기존 원페이지는 브랜드 소개, 제품, 아티스트, 소셜 콘텐츠가 나뉘어 있었지만 새 콘셉트의 인상이 충분히 선명하지 않았다. 이번 브랜치에서는 Marshall의 핵심 이미지인 무대, 앰프, 신호, 라이브 문화를 중심으로 정보 구조를 다시 잡았다.

## 3. 해결 방향
- `Hero -> Signal Chain -> Gear Line -> Stage Mode -> Community -> Footer` 흐름으로 재구성
- 포트폴리오 설명 섹션은 화면에서 제거하고 브랜드 사이트처럼 보이도록 조정
- 제품군은 단순 나열보다 사용 장면과 장비 이미지를 함께 보여주는 블록으로 구성
- 아티스트와 소셜 성격의 중복 콘텐츠를 Community 흐름으로 통합
- fixed-on-scroll 헤더와 균일한 캐러셀 카드 높이로 사용성을 보강

## 4. 디자인 포인트
- 블랙/차콜 배경에 Stage Red를 주 포인트로 사용
- Signal Cyan은 신호, 상태, 보조 라벨에 제한적으로 사용
- 스튜디오 콘솔, 신호 체인, 무대 조명을 떠올리게 하는 그래픽 레이어 적용
- 카피는 짧은 영문 헤드라인과 자연스러운 한국어 문장으로 정리

## 5. 구현 포인트
- `navigation.js`: 모바일 메뉴, ESC 닫기, 포커스 트랩, fixed 헤더 토글
- `scroll-animations.js`: IntersectionObserver 기반 등장 효과
- `swiper-init.js`: Community 캐러셀 초기화 및 autoHeight 비활성화
- `footer.js`: 모바일 푸터 아코디언
- CSS 브레이크포인트: 기본 / 768 / 1024 / 1920

## 6. 검증
- JS 문법 검사 통과
- HTML 파싱 확인
- UTF-8 replacement character 확인
- 이미지 참조 누락 확인
- 모바일 390px, 데스크톱 1440px 기준 화면 확인

## 7. 다음 개선 후보
- 실제 제품 상세 페이지나 캠페인 페이지로 이어지는 하위 구조 설계
- `srcset`과 이미지 사이즈별 최적화 확대
- 스크린리더 테스트와 키보드 탐색 시나리오 추가
- 최종 포트폴리오 통합 문서에서 의사결정 과정과 개선 전후 비교 정리
