# Marshall React Experiment

정적 HTML/CSS/Vanilla JS로 만든 Marshall 페이지를 React/Vite 구조로 옮겨 자유롭게 만져보는 개인 실험본입니다.

## 방향

- 원본 정적 사이트를 대체하지 않는 별도 React playground입니다.
- 기존 Marshall 헤리티지는 참고하되, 이미지는 현재 단계에서 로컬 placeholder로 임시 대체하고 필터/비교/캐러셀 같은 핵심 인터랙션을 React state 기반으로 실험합니다.
- 시각 방향은 과한 콘셉트 UI보다 오래 만져볼 수 있는 차분한 editorial UI를 우선합니다.

## 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

OneDrive 경로에서 `spawn EPERM`이 발생하면 같은 명령을 권한 상승 환경에서 다시 실행합니다.

## 구조

- `src/App.jsx`: 페이지 섹션과 React 인터랙션
- `src/data.jsx`: 제품, 아티스트, 소셜, 푸터 데이터와 제품 서브 페이지 확장 필드
- `src/components/Picture.jsx`: JPG/WebP/AVIF responsive image 컴포넌트
- `src/components/PlaceholderMedia.jsx`: 실제 이미지 큐레이션 전까지 사용하는 로컬 CSS placeholder 컴포넌트
- `src/hooks/`: 스크롤 애니메이션과 반응형 상태 hook
- `src/styles/`: 원본 CSS와 React 실험본 보완 스타일
- `docs/UI_UX_GUIDE.md`: React 실험본 UI/UX 기준

## 현재 실험

- Products 필터와 Compare Deck
- Artists 필터와 Focus 요약
- Social React carousel
- 이미지 위치 임시 placeholder 전환: 섹션명, 이미지 역할, 권장 비율 표시
- `/about`, `/products`, `/artists`, `/social` 러프 서브 페이지 초안
- `/products` 제품 인덱스 시작본: 제품 필터, 요약 카드, placeholder 미디어 슬롯

## 이후 확장 메모

외부 라우터 의존성은 아직 추가하지 않고, 현재는 가벼운 pathname 기반 전환으로 4개 서브 페이지 초안을 연결했습니다. 다음 구조로 확장할 수 있게 데이터와 UI를 계속 정리합니다.

- `/products`: 제품 목록 시작본 구현 완료, 상세 페이지는 다음 단계
- `/about`: 브랜드 헤리티지 상세 초안
- `/artists`: 아티스트 목록 상세 초안
- `/social`: heritage, story, community 콘텐츠 허브 초안

제품 데이터에는 상세 페이지 확장을 고려해 `slug`, `summary`, `heroLabel` 필드를 추가했습니다.
