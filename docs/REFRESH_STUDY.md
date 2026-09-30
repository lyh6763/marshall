# Front Row 재작업 기록 — 2026-09-29

## 방향과 구현

무대의 현장감은 유지하되 제품은 제품 자체로 설명한다. 헤더의 가까운 구도는 유지하고 기존 붉은 조명·크림색 대신 백색 조명·중성적인 검정·흰색·회색을 사용했다.

홈은 히어로 → DSL40 Combo → Acton IV / Monitor III A.N.C. → 공식 이야기로 단순화했다. 별도 경로 선택, Signal Journey, 추천 질문, 비교표, 캐러셀은 홈에서 제외했다. 예전 파일은 이후 2026-09-30 정리에서 저장소에서 제거했다(git 기록에 보존). 상세 주소와 사양·비적합 상황·공식 출처는 유지했다.

## 이미지

- 생성 히어로: `img/front-row-white.webp` (1672×941, 89,894 bytes)
- 모바일: `img/front-row-white-mobile.webp` (640×920, 61,280 bytes)
- 제품: `img/product-{dsl40-combo,acton-iv,monitor-iii-anc}-{480,1000}.webp` (Acton 큰 파일의 실제 너비 960px)
- 공식 사진 원본: [매니페스트](product-image-sources.json)
- 공식 사진은 사용자가 승인한 로컬 비공개 시안용. 공개 배포 이용허락은 확보하지 않았다.
- 이미지 생성 스킬에 따라 히어로만 생성하고, 제품은 실제 사진을 크기·형식 변환해 사용했다.

## 히어로 생성 프롬프트

Use case: photorealistic-natural. Create a landscape 16:9 photographic website hero: visceral intimate rock performance in a tiny club, photographed from the front row at low eye level, incredibly close to the stage. A fictional adult guitarist with short dark tousled hair and a plain faded charcoal t-shirt occupies the right 55 percent, moving forward sideways with knees bent and playing an electric guitar, looking down at the instrument, not posing for the camera. Natural, correct hands fretting and strumming. Hard direct neutral WHITE flash catches real sweat, pale natural skin tones, rough cotton, the black guitar and metallic strings. This should feel like a great raw contemporary live music photograph, caught abruptly mid-song, NOT a polished cinematic movie frame. Dim concrete-grey background, low ceiling, vague drummer further behind, black unbranded amplifier along the far right; one slightly cool-white stage lamp in the upper right, restrained faint greenish practical light far behind. Left 40 percent is very dark neutral charcoal empty stage shadow for oversized white HTML title overlay, and the top strip dark enough for a nav. Audience shoulder partially crosses the very bottom left edge. Crisp subject with slight physically plausible motion in guitar picking hand; honest photographic texture. Broad highlights, forceful uneven light, deep blacks. No sepia, no warm ivory, no amber, no red lighting, no orange lighting, no global cyan tint, no purple glow, no thick theatrical smoke, no studio beauty lighting, no dramatic god rays, no borders, no text, no logos, no real musicians. Keep head and guitar within central-right area so they work in a vertical crop. Subject must be convincingly life-size and close, not a distant stadium performer.

## 검증

- npm test: HTML 참조·시맨틱과 CSS·JS 기본 검사 통과.
- Edge 홈: 390×844 / 768×1024 / 1440×900 / 1920×1080. 가로 넘침·이미지 누락·페이지 스크립트 오류 없음.
- 제품 상세 3종: 390 / 1440px, 가로 넘침 없음, 실제 제품 사진 로드 확인.
- 모바일 키보드: Enter 열기, Tab 순환, Escape 닫기, 트리거로 포커스 복귀.
- 앰프 CTA 앵커가 고정 헤더 아래에 배치되고, 세 상세 링크와 목록 복귀 작동.
- 모션 감소: 히어로 transform 없음.
- JavaScript 비활성: 모바일 메뉴와 제품 상세 경로 작동.
- 모바일/데스크톱별 히어로 요청 한 개. preload와 실제 source 일치.
- 실제 사용자 테스트와 배포 후 Core Web Vitals는 미측정.

스크린샷: `docs/previews/white-stage-*.png`, `white-gear-*.png`, `white-products-*.png`, `white-detail-*.png`.
