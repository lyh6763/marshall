(function () {
    'use strict';

    // 좁은 화면 전체 화면 메뉴는 네이티브 모달 dialog다.
    // 배경 비활성(inert)·포커스 가두기·Escape 닫기·닫을 때 포커스 복귀는 브라우저가,
    // 여닫는 페이드와 뒤 페이지 스크롤 잠금은 CSS(@starting-style, :has)가 맡는다.
    // 여기서는 여닫기 연결과 버튼의 aria-expanded만 맞춘다.

    const DESKTOP = window.matchMedia('(min-width: 1024px)');

    // dialog를 지원하지 않는 아주 오래된 브라우저는 스크립트가 없을 때처럼 메뉴를 본문 흐름에 펼친다.
    if (typeof HTMLDialogElement !== 'function' || typeof HTMLDialogElement.prototype.showModal !== 'function') {
        document.documentElement.classList.remove('js');
        return;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const dialog = document.getElementById('menu-dialog');
        const openButton = document.querySelector('.header_center .btn');
        const closeButton = dialog?.querySelector('.close_btn');
        if (!dialog || !openButton || !closeButton) return;

        const setExpanded = (expanded) => openButton.setAttribute('aria-expanded', String(expanded));

        openButton.addEventListener('click', () => {
            if (DESKTOP.matches || dialog.open) return;
            dialog.showModal();
            setExpanded(true);
        });

        closeButton.addEventListener('click', () => dialog.close());

        // 메뉴 안 링크를 누르면 닫는다. 앵커 이동은 클릭 처리가 끝난 뒤(닫힌 뒤)에 일어난다.
        dialog.addEventListener('click', (event) => {
            if (event.target instanceof Element && event.target.closest('a[href]')) dialog.close();
        });

        // 닫기 버튼·링크·Escape 어느 경로로 닫혀도 버튼 상태를 맞춘다.
        dialog.addEventListener('close', () => setExpanded(false));

        // 넓은 화면으로 바뀌면 전체 화면 메뉴를 닫는다. 메뉴 버튼은 그때 숨으므로 포커스는 가로 메뉴 첫 링크로 옮긴다.
        DESKTOP.addEventListener('change', (event) => {
            if (!event.matches || !dialog.open) return;
            dialog.close();
            document.querySelector('#site-nav a')?.focus({ preventScroll: true });
        });
    });
})();
