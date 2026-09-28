# CHANGELOG

프로젝트의 주요 변경 사항을 기록합니다.

## 2026-09-28
- 2차 아트 디렉션 패스: 청록색 스튜디오 Hero와 회색 제품 컷을 백스테이지·리스닝룸·클럽 공연 이미지 4종으로 전면 교체
- Hero 카피를 `Built to / Move Air` 초대형 아웃라인 타이포와 신호 레일 구조로 재설계
- Gear Line을 교차형 가로 카드에서 스태거드 3열 에디토리얼 카드로 변경
- 아티스트 이미지 색감을 따뜻한 필름 톤으로 통일하고 맥락이 약한 패션 컷을 백스테이지 청취 장면으로 교체
- 데스크톱·모바일 실제 브라우저 렌더링 및 Gear Finder, 비교표, 캐러셀 인터랙션 검증 완료
- Case Study에 신규 이미지 아트 디렉션 섹션과 4종 비주얼 갤러리 추가
- 교체 후 참조되지 않는 기존 Hero·텍스처·제품 컷·아티스트 이미지 14개 제거
- Hero를 `main` 안으로 이동하고 페이지 제목을 유일한 `h1`으로 정리
- 17개 placeholder 링크를 제거하고 검증된 Marshall 공식 목적지로 연결
- Swiper CDN을 제거하고 CSS scroll-snap 및 Vanilla JS 기반 캐러셀로 교체
- 캐러셀에 이전/다음 버튼, 키보드 이동, 현재 위치 안내를 추가
- Footer를 네이티브 `<details>` 구조로 변경해 JavaScript 없이도 콘텐츠 접근 가능
- no-JS 내비게이션과 모션 감소 환경의 스크롤 동작을 보완
- cyan 중심 색상을 Vinyl Black, Stage Red, Brass, Warm Cream 토큰으로 재설계
- Input / Drive / Air / Crowd 스크롤 연동 Signal Journey 추가
- 사용 환경·우선 가치 기반 Gear Finder와 장비군 비교표 추가
- Headphones / Speakers / Amplifiers 상세 페이지 3종 추가
- 문제 정의와 개선 결과를 설명하는 `case-study.html` 추가
- 외부 의존성 없이 실행되는 `npm test` 통합 검증 추가
- 참조가 사라진 소셜 아이콘 이미지 3개 제거

## 2026-06-12
- Visual QA 후 제품/아티스트/커뮤니티 이미지를 WebP `srcset`으로 최적화
- 참조되지 않는 Live Signal Lab PNG 원본 제거
- Live Signal Lab 문서 구조와 설명 업데이트
- fixed-on-scroll 헤더 구현 내용 반영
- Community 캐러셀 카드 높이 정규화 내용 반영
- 포트폴리오 설명 섹션을 화면에서 제외한 현재 방향 명시

## 2026-06-11
- Neo Studio + Red Stage 콘셉트로 전환
- 섹션 흐름을 `Hero -> Signal Chain -> Gear Line -> Stage Mode -> Community -> Footer`로 재구성
- 히어로/텍스처 비주얼 자산 추가 및 WebP 적용
- 반응형 레이아웃과 카피, 인터랙션 QA 진행

## 2026-02-02
- `docs` 폴더와 기본 문서 생성
