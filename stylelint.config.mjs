// 오류를 잡는 규칙만 쓴다. 표기만 바꾸는 규칙(stylelint-config-standard)은 넣지 않는다.
//
// npm run lint:css는 --cache를 붙여 돈다. 캐시를 끄면 stylelint가 fs.rmSync로 캐시 파일을 지우는데,
// Windows의 Node 24에서는 한글이 든 경로(…/포트폴리오/…)에서 이 호출이 오류 없이 프로세스를 끝낸다
// (종료 코드 127, 2026-11-10 Node 24.13에서 확인). 캐시는 node_modules/.cache에 둔다.
export default {
    extends: ['stylelint-config-recommended'],
    rules: {
        // 더 약한 선택자가 더 강한 선택자 뒤에 오면 알리는 규칙이다. 두 규칙이 같은 요소에 걸려도
        // 강한 쪽이 이기므로 둘의 순서를 바꿔도 화면은 같다. 이 사이트의 14건(2026-11-10)은 대부분
        // 다른 맥락의 요소(.fit_list p와 .detail_section_header > p:last-child 등)이거나
        // 일부러 둔 :hover 덮어쓰기다. 가독성 경고만 대량으로 내므로 끈다.
        'no-descending-specificity': null,
    },
};
