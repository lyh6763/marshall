# React Premium Editorial UI/UX Guide

## Design Goal

- React 실험본은 원본 Marshall 사이트를 대체하지 않는 개인 playground다.
- 시각 톤은 과한 실험실/네온/계측기 UI가 아니라, 오래 반복해서 만져볼 수 있는 차분한 editorial UI다.
- 추가 기능은 콘텐츠를 돕는 수준으로만 둔다. 기능이 섹션의 주인공이 되면 안 된다.

## Hard Rules

- 장식성 floating console, 의미 없는 세계관 카피, 과한 네온/글로우/계측기 UI를 쓰지 않는다.
- 작은 모바일 폭에서만 맞는 absolute 배치나 고정 높이로 랩탑/데스크탑을 처리하지 않는다.
- 카드 안에 또 다른 카드가 들어가는 구조를 만들지 않는다.
- 기능 설명 문구를 화면에 길게 노출하지 않는다.
- 이미지가 부족하다는 이유로 같은 이미지를 분위기용 배경으로 반복하지 않는다.
- placeholder는 임시 레이아웃 확인용으로만 쓰고, 완성 이미지처럼 꾸미지 않는다.

## Layout And Breakpoints

- `390px`: 한 열 레이아웃. 버튼은 2열 이하, 본문은 줄바꿈을 우선한다.
- `768px`: 필터와 상태 요약을 한 줄에 배치할 수 있다. 콘텐츠 카드는 2열까지 허용한다.
- `1024px`: 랩탑 기준. 제품/소셜은 이미지와 텍스트가 나란히 읽혀야 한다.
- `1440px`: 데스크탑 기준. 컨테이너는 넓어지되 텍스트 행 길이는 과도하게 늘리지 않는다.
- `1920px`: 와이드 기준. max-width를 둬서 콘텐츠가 화면 끝까지 벌어지지 않게 한다.

## Typography

- 섹션 제목은 기존 Marshall의 강한 대문자 톤을 유지한다.
- 카드/패널 내부 제목은 히어로 크기를 쓰지 않는다.
- 본문은 한국어 가독성을 우선하고 `word-break: keep-all`을 기본으로 한다.
- 장식적인 영문 혼용은 라벨이나 상태값에만 제한한다.

## Controls

- 필터는 `aria-pressed`와 시각적 active 상태를 항상 동기화한다.
- Products의 Compare Deck은 최대 2개 선택으로 유지한다.
- Artists의 Focus는 선택된 아티스트의 `signal`과 `venue`만 간결하게 보여준다.
- Social carousel은 이전/다음, 점 버튼, 키보드 좌우 이동, Auto 토글을 지원한다.

## Image Curation

- 현재 단계에서는 실제 이미지 대신 `PlaceholderMedia`를 사용할 수 있다.
- placeholder는 섹션명, 이미지 역할, 권장 비율만 보여준다.
- Hero, Products, Artists, Social, Partnership 위치는 각각 다른 placeholder 라벨을 사용한다.
- 기존 최적화 이미지 데이터와 파일은 삭제하지 않는다. 실제 이미지 큐레이션이 끝나면 `Picture` 컴포넌트로 되돌릴 수 있어야 한다.
- 실제 이미지로 교체할 때는 `Picture` 컴포넌트를 사용하고 `alt`, `width`, `height`를 유지한다.

## Subpage Planning

- 외부 라우터 의존성은 아직 추가하지 않고, 현재는 pathname 기반 전환으로 `/about`, `/products`, `/artists`, `/social` 러프 초안을 제공한다.
- 향후 각 서브 페이지를 목록/상세 구조로 확장한다.
- `/about`은 브랜드 헤리티지와 톤 정리를 담당한다.
- `/products`는 제품 목록 시작본을 담당하며, 상세 페이지는 다음 단계에서 붙인다.
- `/artists`는 아티스트 목록과 아티스트 상세를 담당한다.
- `/social`은 heritage, story, community 콘텐츠 허브를 담당한다.
- 제품 데이터에는 상세 페이지 확장을 고려해 `slug`, `summary`, `heroLabel` 필드를 둔다.

## Copy Tone

- 문구는 짧고 명확하게 쓴다.
- “실험”, “playground”는 README나 보조 문맥에서만 쓰고, 화면의 주요 콘텐츠 카피에는 남발하지 않는다.
- 브랜드 공식 문구처럼 보이는 과장 표현보다, 오래 읽어도 부담 없는 차분한 한국어를 우선한다.
