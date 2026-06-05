# Marshall React Experiment

정적 HTML/CSS/Vanilla JS로 만든 Marshall 포트폴리오를 React/Vite 구조로 옮긴 개인 실험본입니다.

## 방향

- 원본 정적 사이트를 대체하지 않는 별도 React playground입니다.
- 기존 Marshall 이미지와 헤리티지를 유지하되, 필터/비교/캐러셀 같은 핵심 인터랙션만 React state 기반으로 실험합니다.
- 시각 방향은 과한 콘셉트 UI가 아니라 포트폴리오 평가에 안전한 premium editorial 톤을 우선합니다.

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
- `src/data.jsx`: 제품, 아티스트, 소셜, 푸터 데이터
- `src/components/Picture.jsx`: JPG/WebP/AVIF responsive image 컴포넌트
- `src/hooks/`: 스크롤 애니메이션과 반응형 상태 hook
- `src/styles/`: 원본 CSS와 React 실험본 보완 스타일
- `docs/UI_UX_GUIDE.md`: React 실험본 UI/UX 기준

## 현재 실험

- Products 필터와 Compare Deck
- Artists 필터와 Focus 요약
- Social React carousel
- 이미지 접근성 구조 유지: `picture/img`, `alt`, `width`, `height`
