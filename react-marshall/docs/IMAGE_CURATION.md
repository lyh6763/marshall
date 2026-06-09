# React Marshall Image Curation Matrix

## Purpose

이 문서는 React 메인/서브 페이지의 `PlaceholderMedia` 슬롯을 실제 이미지로 교체하기 전, 각 이미지가 어떤 역할을 해야 하는지 고정하기 위한 기준표입니다. 현재 단계에서는 새 외부 이미지 다운로드나 AI 이미지 생성 없이, 기존 로컬 optimized 에셋과 향후 큐레이션 방향만 정리합니다.

## Reference Direction

- Marshall official: 제품군, 헤리티지, 백스테이지, 커뮤니티 이미지의 기본 주제와 브랜드 맥락을 참고합니다.
- Bang & Olufsen: 과한 장식 대신 소재감, 여백, 빛의 방향, 프리미엄 제품 촬영 톤을 참고합니다.
- Teenage Engineering: 제품 정보와 이미지가 촘촘하게 연결되는 구성 방식만 참고하고, 장난감 같은 UI 톤은 그대로 가져오지 않습니다.

## Main Page Slots

| Section | Placeholder | Role | Ratio | Existing Asset Candidate | New Image Requirement |
| --- | --- | --- | --- | --- | --- |
| Hero | `Hero` | 대표 비주얼 | `2 / 1` | `head_img-*` | 브랜드 첫인상을 만드는 넓은 장면. 무대, 앰프 질감, 헤리티지 분위기가 함께 읽히고 텍스트 영역이 복잡하지 않아야 합니다. |
| Products | 제품별 카드 | 제품 이미지 | `1 / 1` | `marshall_headphone-*`, `marshall_speaker-*`, `marshall_amp-*` | 제품군이 즉시 구분되는 단일 제품 중심 이미지. 헤드폰은 착용/클로즈업, 스피커는 공간 배치, 앰프는 장비감을 우선합니다. |
| Artists | `Artists` | 아티스트 배너 | `4 / 1` | `artist_banner-*` | 인물보다 무대/스튜디오의 분위기를 넓게 보여주는 배너. 중앙 피사체가 너무 복잡하지 않아야 합니다. |
| Artists | 아티스트별 카드 | 아티스트 이미지 | `1 / 1` | `artist01-*` to `artist04-*` | 공연, 리허설, 녹음 장면처럼 인물과 사운드 장비의 관계가 보여야 합니다. 단순 프로필 사진은 우선순위를 낮춥니다. |
| Social | 스토리별 슬라이드 | 스토리 이미지 | `1 / 1` | `social_heritage-*`, `social_story-*`, `social_community-*` | Heritage, Story, Community가 서로 다른 콘텐츠처럼 보여야 합니다. 카드 안에서 주제가 즉시 읽혀야 합니다. |
| Partnership | `Partnership` | 캠페인 이미지 | `3 / 2` | `social_partnership-*` | 협업/캠페인 성격이 보여야 합니다. 제품 단독보다 촬영장, 오브젝트, 사람의 맥락이 함께 있는 장면을 우선합니다. |

## Subpage Hero Slots

| Page | Placeholder | Role | Ratio | Existing Asset Candidate | New Image Requirement |
| --- | --- | --- | --- | --- | --- |
| `/about` | `About` | 헤리티지 대표 이미지 | `16 / 9` | `head_img-*`, `artist_banner-*` | 브랜드 역사와 장비 유산을 보여주는 아카이브형 이미지. 오래된 앰프, 작업실, 공연 문화의 흔적이 필요합니다. |
| `/products` | `Products` | 컬렉션 대표 이미지 | `16 / 9` | `head_img-*`, `marshall_speaker-*` | 제품 라인업의 선택 흐름을 여는 이미지. 제품군 전체를 억지로 넣기보다 대표 제품과 공간감이 보여야 합니다. |
| `/artists` | `Artists` | 아티스트 대표 이미지 | `16 / 9` | `artist_banner-*` | 공연자와 장비, 무대 빛이 함께 보이는 editorial hero. 인물 클로즈업보다 사운드 현장이 우선입니다. |
| `/social` | `Social` | 커뮤니티 대표 이미지 | `16 / 9` | `social_community-*`, `social_heritage-*` | 브랜드 커뮤니티와 스토리 허브를 여는 이미지. 관객, 장소, 기록물이 함께 있는 장면이 필요합니다. |

## Subpage Collection Slots

| Page | Placeholder | Role | Ratio | Existing Asset Candidate | New Image Requirement |
| --- | --- | --- | --- | --- | --- |
| `/products` | 제품별 카드 | `Portable Listening`, `Room Sound`, `Stage Output` | `4 / 3` | `marshall_headphone-*`, `marshall_speaker-*`, `marshall_amp-*` | 메인 제품 카드보다 설명적인 컷. 사용 환경이나 제품 스케일이 보여야 합니다. |
| `/artists` | 아티스트별 카드 | 아티스트 이미지 | `4 / 3` | `artist01-*` to `artist04-*` | 장르와 장소가 구분되는 이미지. 라이브, 스튜디오, 클럽, 투어의 차이가 카드 간에 보여야 합니다. |
| `/social` | 스토리별 카드 | 스토리 이미지 | `4 / 3` | `social_heritage-*`, `social_story-*`, `social_community-*` | Heritage는 기록물, Story는 장면 중심, Community는 사람과 장소 중심으로 분명히 구분되어야 합니다. |

## Replacement Rules

- 실제 이미지로 교체할 때는 `PlaceholderMedia`를 `Picture` 컴포넌트로 되돌리고 `alt`, `width`, `height`를 유지합니다.
- 같은 이미지를 여러 섹션에서 분위기용으로 반복하지 않습니다. 반복이 필요하면 크롭 목적이 명확해야 합니다.
- 텍스트 위에 이미지가 올라가는 hero/banner 슬롯은 중앙에 복잡한 피사체가 몰리지 않는 이미지를 우선합니다.
- 제품 이미지는 예쁜 분위기보다 제품군 식별성이 먼저입니다.
- 아티스트/소셜 이미지는 스톡 사진처럼 보이는 군중 이미지보다 Marshall, 장비, 사운드 맥락이 읽히는 장면을 우선합니다.
