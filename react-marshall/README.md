# Marshall React Experiment

정적 HTML/CSS/Vanilla JS로 만든 Marshall 포트폴리오를 React/Vite 구조로 옮겨 본 개인 실험본입니다.

## 목적

- 원본 사이트의 디자인과 콘텐츠 흐름을 유지하면서 React 컴포넌트 구조로 재구성
- 메뉴, 푸터 아코디언, 소셜 슬라이더 같은 인터랙션을 React state/hook 기반으로 분리
- 기존 이미지 접근성 개선(`picture/img`, alt, dimensions, JPG/WebP/AVIF)을 React 컴포넌트에서도 유지

## 실행

```bash
npm install
npm run dev
```

## 빌드

```bash
npm run build
```

## 구조

- `src/App.jsx`: 페이지 섹션과 주요 인터랙션
- `src/data.jsx`: 제품, 아티스트, 소셜, 푸터 링크 데이터
- `src/components/Picture.jsx`: JPG/WebP/AVIF responsive image 컴포넌트
- `src/hooks/`: 스크롤 애니메이션과 반응형 상태 hook
- `src/styles/`: 원본 CSS를 React 앱 public asset 경로에 맞춰 복사한 스타일

이 앱은 원본 정적 사이트를 대체하지 않고, React 전환 연습과 포트폴리오 확장 실험을 위한 별도 버전입니다.
