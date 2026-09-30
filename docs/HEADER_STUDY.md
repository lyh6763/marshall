# Front Row 헤더 시안

2026-09-29. 사용자가 선택한 방향: Marshall의 거칠고 정열적인 인상을 살리고, 웹에서 무대 현장에 가까이 있는 감각을 전달한다. 우선 헤더와 첫 화면을 검토할 수 있도록 구현했다.

## 화면

- 가까운 관객 시점의 연주 이미지, 크림색 FRONT ROW 타이포, 짧은 한국어 문구.
- 상단 메뉴는 Amplifiers / Speakers / Headphones / Stories. 첫 화면의 주 행동은 앰프 탐색.
- 스크롤 시 배경과 제목이 최대 24/44px의 다른 속도로 이동한다. 모션 감소에서는 이동하지 않는다.
- 비공식 콘셉트 표기는 제작 이야기 링크와 기존 푸터에 제공한다.
- 본문 정보 구조와 제품 상세는 이번 헤더 시안 범위에 포함하지 않았다.

## 에셋과 생성 기록

내장 ImageGen 사용. CLI/API 경로는 사용하지 않았다.

- `img/front-row-hero.webp`: 1672 × 941, 104,748 bytes.
- `img/front-row-hero-mobile.webp`: 640 × 920, 56,866 bytes. 생성 원본의 오른쪽 공연 장면을 모바일용으로 크롭하고 최적화했다.
- 모바일/데스크톱 미디어 조건을 picture와 preload에 동일하게 적용했다.
- 이미지 속 인물과 공연은 가상 장면이며, 공식 공연 기록이나 제품 외관 자료가 아니다.

최종 생성 프롬프트:

> Use case: photorealistic-natural. Asset type: full-bleed landscape hero photograph for an independent Marshall-inspired rock music website. Create a visceral, beautifully composed candid concert photograph from the very front of a tiny crowded club, low audience-eye viewpoint just below stage level. An anonymous adult rock guitarist occupies the right half, body lunging forward into a chord, black sleeveless shirt, dark worn jeans, messy hair obscuring face; natural credible guitar-playing hands and instrument anatomy. A large unbranded black amplifier stack and partially seen drummer recede into stage haze. Very close out-of-focus audience shoulders intrude at the bottom corners. Strong saturated dark crimson stage light, one hot warm ivory backlight, real black shadows, energetic slight motion blur confined to hair, warm analog grain. The left 40 percent is mostly dark red haze and shadow with room for enormous ivory web typography; upper strip dark for navigation. The guitarist head stays in right upper-middle, not under left headline. Wide 16:9 composition at about 2400 pixels wide. Raw intimate rock performance, editorial music photography, dramatic imperfect framing, credible small club ceiling. No stadium, no raised devil-horns hands, no flames, no laser grids, no fake vintage borders, no text, no logo, no watermark, no recognizable real musician. Keep enough guitar and performer in the central-right region to crop for mobile.

## 검증

- `npm test`: 5 HTML / 10 CSS / 7 JS 통과.
- Edge headless: 390×844, 768×1024, 1440×900, 1920×1080에서 화면 확인, 가로 넘침과 페이지 스크립트 오류 없음.
- 320×568에서 가로 넘침 없음.
- 모바일 메뉴 Enter 열기, Tab 순환, Escape 닫기와 포커스 복귀 확인.
- 스크롤 후 고정 헤더에서 모바일 메뉴 정상 표시, 앰프 이동 후 대상이 헤더 아래에 표시됨.
- 모션 감소에서 이미지 transform 없음. JavaScript 비활성 모바일 메뉴와 앵커 동작 확인.
- 모바일/데스크톱 각각 해당 히어로 이미지 한 개만 요청됨.
- 검증 이미지: `docs/previews/front-row-{390,768,1440,1920}.png`, `front-row-menu.png`.
- 배포 후 Core Web Vitals 실측은 수행하지 않았다.
