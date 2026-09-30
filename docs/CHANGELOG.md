# CHANGELOG

프로젝트의 주요 변경 사항을 기록합니다.

## 2026-09-30
- 가독성: 10px 기준 rem에서 너무 작던 글자 크기 상향. 본문·링크·메뉴 14px 이상, 라벨 12~13px 이상, 법적 고지 12px 이상
- 프로젝트 이름을 Marshall Front Row로 통일(페이지 제목, 공유 메타, 로고 대체 텍스트, package.json)
- 홈에서 쓰지 않던 JS 4개, CSS 2개, 이미지 42개 제거. 이전 구현은 git 기록으로만 보존
- CSS 정리: 어떤 요소와도 맞지 않는 규칙 약 1,460줄 제거, marshall768/1024/1920을 marshall.css로 합치고 stage-header.css가 덮어쓰던 선언 제거. 5개 페이지 × 5개 너비와 메뉴·고정 헤더·no-JS 상태의 계산된 스타일이 정리 전과 같음을 비교로 확인
- 상세 페이지·Case Study의 `.eyebrow` 라벨에 스타일이 적용되지 않던 문제 수정
- 링크 표시 통일: 페이지 안 이동 ↓, 다른 페이지 →, 외부 사이트 ↗. 상단 메뉴 네 항목을 모두 홈 안 섹션으로 연결하고, 첫 화면 CTA는 DSL40 상세로 연결
- 고정 헤더 로직을 navigation.js에서 stage-header.js로 이동
- `npm test`에 사용하지 않는 css/js/img 파일 검사 추가, 오류 경로를 운영체제와 관계없이 상대 경로로 표시

## 2026-09-29
- 후속 재작업: Front Row 백색 조명 히어로, 중성색 제품 영역, 실제 공식 제품 사진으로 변경. 공식 사진은 사용자 승인에 따른 로컬 비공개 시안용
- 홈의 선택·추천·비교·캐러셀을 덜어내고 제품으로 바로 연결. 상세 3종과 Case Study·문서를 현재 구조로 갱신
- 현재 검증 및 이미지 생성 기록: [REFRESH_STUDY.md](REFRESH_STUDY.md). 아래 항목은 같은 날 앞 단계 이력
- 첫 화면과 내비게이션을 Play / Listen / Discover 경로로 재구성하고 고정 헤더와 앵커 이동의 제목 가림을 검증
- 숨겨진 점수 기반 Gear Finder를 세 장면의 명시적 선택과 두 가지 추천 이유로 교체
- Monitor III A.N.C. / Acton IV / DSL40 Combo의 공식 사양·비적합 상황·출처·확인일을 상세 페이지에 반영
- 제품 외형을 가장하지 않는 자체 연출 장면 이미지 3종과 반응형 WebP/JPEG 자산 추가
- 범용 아티스트 카드 4종을 제거하고 제작·작은 공연장·Amplify 공식 이야기와 자체 그래픽으로 재구성
- 제품 정보 구간에 밝은 배경을 적용하고 카드 컨테이너 쿼리, 히어로 preload/srcset 일치, 장식적 등장 효과 제거
- 비공식 포트폴리오 고지와 저작권 표기를 바로잡고 Case Study·기획서·출처 목록 갱신
- 390/768/1440/1920px 실브라우저에서 콘솔 오류·가로 넘침·장면 선택·비교표·no-JS 경로 확인

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
