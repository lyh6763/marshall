# MARSHALL 리디자인

Marshall 브랜드의 스토리와 제품/아티스트/커뮤니티를 **원페이지 스토리 흐름**으로 전달하는 포트폴리오 프로젝트입니다.

## 프로젝트 개요
- 유형: 확인 필요 (개인/팀)
- 기간: 확인 필요
- 역할: 확인 필요
- 산출물: 원페이지 웹사이트 + JS 모듈(네비게이션/스크롤 애니메이션/슬라이더)

## 목표
- About → Products → Artists → Social로 이어지는 서사형 흐름 구성
- 강렬한 히어로와 섹션별 스토리 텍스트로 브랜드 톤 전달

## 페이지 구조
- Hero: 슬로건/리드 문구
- About: 브랜드 소개
- Products: Headphones / Speakers / Amplifiers
- Artists: 아티스트 스토리 섹션
- Social: Heritage/Story/Community 슬라이더 + Partnership
- Footer: 회사/고객지원/계정/소셜

## 주요 구현
- 모바일 네비게이션 오버레이(열림/닫힘, ESC 닫기, 포커스 트랩)
- IntersectionObserver 기반 스크롤 애니메이션
- Swiper 슬라이더 + 스크롤바
- 반응형 전용 CSS 분리(768/1024/1920)

## 기술 스택
- HTML5 / CSS3 / Vanilla JS
- Swiper (CDN)

## 접근성
- aria-expanded / aria-controls / aria-hidden 적용
- 키보드 탭 이동 및 포커스 트랩

## 미확정 항목
- 문제 정의/개선 포인트
- 타겟 사용자
- 톤&무드/컬러/타이포 기준
