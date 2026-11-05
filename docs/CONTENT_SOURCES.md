# 콘텐츠 출처 및 비주얼 정책

확인일: 2026-09-29. 이 프로젝트는 비공식 포트폴리오 시안이며, 아래 링크는 사양과 이야기의 확인 자료다. 가격·재고·구매 조건은 인용하지 않는다. 이후 제품 정보가 바뀌면 공식 페이지를 다시 확인한다.

| 페이지 | 공식 출처 | 화면에 사용한 검증 사실 |
| --- | --- | --- |
| Monitor III A.N.C. | [Marshall 제품 페이지](https://www.marshall.com/us/en/product/monitor-iii-anc) | ANC/Transparency, ANC 사용 시 최대 70시간·미사용 시 최대 100시간, Bluetooth 5.3, 접이식, 250g, 방수 기능 없음 |
| Acton IV | [Marshall 제품 페이지](https://www.marshall.com/us/en/product/acton-iv) | Bluetooth 5.3/Auracast, 3.5mm AUX·RCA 입력, 100–240V 콘센트 전원, 260 × 171 × 150mm, 2.65kg |
| DSL40 Combo | [Marshall 제품 페이지](https://www.marshall.com/us/en/product/dsl40-combo) | 올밸브, 40W/20W, 12인치 Celestion V-Type, 2채널·채널당 2모드, 22.9kg |

| 이야기 카드 | 공식 도착 페이지 | 카드의 주제 |
| --- | --- | --- |
| 앰프가 만들어지는 곳 | [Inside the Amplifier Factory](https://www.marshall.com/us/en/inside-the-factory) | Bletchley 공장의 제작 과정과 사람 |
| 작은 공연장에 맞는 소리 | [Amplifiers for small venues](https://www.marshall.com/us/en/amplifiers/small-venues) | 작은 무대의 앰프 선택과 출력 |
| 공연장의 다음 밤을 위해 | [Amplify](https://www.marshall.com/us/en/amplify) | 독립 공연장 지원 |

## 비주얼

현재 히어로는 `front-row-white.webp`와 `front-row-white-mobile.webp`다. 익명의 가상 기타리스트를 가까운 관객 시점에서 바라보는 장면을 ImageGen으로 제작했다. 실존 아티스트나 실제 공연 기록이 아니다. 제작 프롬프트는 [현재 제작 기록](REFRESH_STUDY.md)에 보관한다.

제품 카드·상세 페이지·Case Study의 제품 이미지는 Figma AI(gemini-3.1-flash-image)로 생성한 가상 사진(`img/gear-amp`, `gear-speaker`, `gear-headphones`, 각 640·1000px WebP)이다. 실제 DSL40 Combo, Acton IV, Monitor III A.N.C.가 아니라 로고 없는 가상의 제품이며, Marshall 로고와 브랜드 고유의 외관 요소(금색 패널 등)는 넣지 않았다. 사진은 실물로 믿기 쉬우므로 홈의 사진마다 "가상 이미지"라고 적고, 제품 구역 소개와 상세 페이지 사진 설명·출처 문구, Case Study에도 실제 제품과 다르다고 적었다. 생성 뒤 첫 화면의 중성색에 맞춰 채도를 낮췄다(앰프 75%, 스피커 42%, 헤드폰 45%).

공통 프롬프트 조건: 한 장의 연속된 사진, 정사각형, 근거리 하드 화이트 플래시, 낮은 눈높이, 로고·브랜드 이름·글자·숫자·금색·필기체 엠블럼·사람 없음, 세피아·호박색·붉은 조명·보랏빛 없음. 장면은 앰프(작은 클럽 무대 바닥, 기타 케이블, 바닥 테이프 표시), 스피커(어두운 방의 낡은 탁자, 전원선), 헤드폰(밤 버스 좌석의 가방 위)이다.

이전 단계(2026-09-29~10-06)에는 사용자 승인에 따라 공식 제품 사진을 로컬 검토용으로 썼고, 공개 배포 이용허락이 없어 2026-10-07 자체 SVG 일러스트로 교체했고, 2026-11-05 위 가상 사진으로 다시 바꿨다. 당시 원본 URL은 [제품 이미지 매니페스트](product-image-sources.json)에 기록으로 남긴다.

이전 `scene-personal`, `scene-room`, `scene-stage` 장면과 붉은 조명의 `front-row-hero`는 2026-09-30 저장소에서 제거했다(비공개 작업 저장소에 보관). 이야기 영역은 사진이나 인물 대신 주제와 일치하는 공식 자료 텍스트 링크를 제공한다.
