# WORKLOG

작업 흐름과 확인한 내용을 간단히 기록합니다.

## 2026-09-29
- 후속 작업 완료: 백색 조명 히어로 + 실제 제품 사진 + 중성색 CSS. 공식 사진은 사용자 승인에 따른 로컬 시안 범위로 제한
- 홈 4개 너비·상세 2개 너비, 모바일 키보드 메뉴, 모션 감소, JS 비활성 경로 검증. 현재 기록: [REFRESH_STUDY.md](REFRESH_STUDY.md)
- 아래는 같은 날 앞선 시안의 작업 이력이며 현재 홈의 구성·이미지와 다를 수 있음
- 방향 재논의 후 헤더/첫 화면만 Front Row 시안으로 구현. 관객 가까이의 연주 장면, 큰 단색 타이포, 직접적인 제품 메뉴와 앰프 CTA 적용
- 새 히어로를 내장 ImageGen으로 제작하고 데스크톱 약 105KB, 모바일 약 57KB WebP로 제공. 모바일별 preload와 picture source 일치 확인
- 390/768/1440/1920px 화면 캡처, 320px 가로 넘침 추가 확인. 모바일 키보드 메뉴·Tab 순환·Escape/포커스 복귀·스크롤 후 메뉴·앵커 가림·모션 감소·JS 비활성 메뉴 확인
- 세부 의도와 생성 프롬프트: [HEADER_STUDY.md](HEADER_STUDY.md). 본문은 앞 단계 구조를 유지한 검토용 시안
- 벤치마크 계획의 네 단계를 연속 구현: 홈 경로 → 공식 모델 정보 → 이미지/이야기 대응 → 시각/QA
- Marshall 공식 제품 페이지 세 곳과 제작·공연장·Amplify 자료의 내용을 확인하고 출처와 확인일 기록
- 세 장면 이미지의 프롬프트에서 실물 모델 재현, 로고, 실존 인물 식별을 제외하고 WebP/JPEG로 변환
- 헤드리스 Edge에서 390/768/1440/1920px 가로 넘침 0, 콘솔 오류 0, 앵커 제목 가림 없음, 추천·비교 동작 확인
- JS 비활성 상태에서 경로 카드와 제품 상세 링크의 접근 확인; 배포 후 CWV 실측은 아직 수행하지 않음

## 2026-09-28
- 이미지 적합성 감사에서 청록색 Hero·텍스처, 회색 제품 컷, 음악 맥락이 약한 아티스트 컷을 교체 대상으로 분류
- ImageGen 기본 도구로 Hero 1종과 Headphones / Speakers / Amplifiers 장면 3종을 제작하고 WebP 반응형 파생본 생성
- 데스크톱 Hero를 초대형 타이포 중심으로, Gear Line을 3열 에디토리얼 그리드로 다시 구현
- Edge headless 실브라우저에서 1440×1000 및 390×844 렌더링 캡처
- 두 뷰포트에서 콘솔 오류 0건, Amplifiers 추천, 비교표 4행, 캐러셀 02 이동 확인
- 리디자인 1단계로 정보 구조, 링크 무결성, 시맨틱, 기본 접근성을 정리
- 로고 heading 중복을 제거하고 Hero를 문서의 유일한 `h1`으로 변경
- 가짜 언어 선택과 placeholder 전용 스크립트를 제거
- 외부 Swiper 의존성을 네이티브 scroll-snap 캐러셀로 대체
- Footer를 `<details>`로 전환하고 데스크톱/모바일 상태 동기화 로직을 단순화
- Marshall의 비닐, 황동 노브, 크림 패널에서 가져온 색상·표면 토큰 적용
- Signal Journey, Gear Finder, 비교표, 제품 상세 3종을 순차 구현
- Case Study와 무의존성 정적 검증기를 추가하고 `npm test` 통과

## 2026-06-12
- 모바일/데스크톱 visual QA 진행
- `<picture>`와 WebP `srcset`을 적용하고 이미지 wrapper 비율 문제 보정
- 메뉴 ESC 닫기, 푸터 아코디언, Swiper 키보드 이동, 콘솔 오류 확인
- 최근 커밋 기준으로 작업 상태 확인
- `fix: normalize community carousel slide height` 이후 Community 캐러셀 높이 문제 해결 확인
- `feat: add fixed header on scroll`로 헤더가 첫 화면에서는 absolute, 스크롤 후 fixed 상태로 전환되도록 구현
- 문서가 이전 브랜드 소개 중심 구조를 설명하고 있어 Live Signal Lab 기준으로 업데이트 시작

## 2026-06-11
- `codex/marshall-alt-concept` 브랜치에서 Live Signal Lab 콘셉트 구현
- HTML 구조와 카피를 Signal Chain, Gear Line, Stage Mode, Community 흐름으로 재구성
- Stage Red와 Signal Cyan을 중심으로 CSS 토큰과 섹션 스타일 정리
- 새 히어로/텍스처 이미지를 추가하고 WebP로 연결
- 모바일, 데스크톱, 1920px 이상 반응형 레이아웃 조정
- JS 문법 검사, HTML 파싱, 이미지 참조, 주요 인터랙션 확인

## 2026-02-02
- 기본 문서 생성
- 초기 작업 범위와 보완 항목 기록
