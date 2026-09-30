(function () {
    'use strict';

    const catalog = {
        headphones: {
            label: 'Monitor III A.N.C.',
            summary: '혼자 이동하며 음악에 집중할 때 적합한 오버이어 헤드폰입니다.',
            reasons: ['주변 소음을 줄이는 ANC와 주변 소리를 듣는 Transparency 모드', 'ANC 사용 시 최대 70시간의 무선 재생 시간'],
            purpose: '개인 청취',
            place: '이동 중 · 개인 공간',
            power: '충전식 · 접이식',
            link: 'products/headphones.html'
        },
        speakers: {
            label: 'Acton IV',
            summary: '집 안에서 함께 음악을 듣는 공간을 위한 홈 스피커입니다.',
            reasons: ['방 안으로 퍼지는 스테레오 사운드', 'Bluetooth 5.3 및 AUX/RCA 입력 지원'],
            purpose: '공간 청취',
            place: '집 · 리스닝룸',
            power: '콘센트 전원 · 고정 배치',
            link: 'products/speakers.html'
        },
        amplifiers: {
            label: 'DSL40 Combo',
            summary: '기타 연습과 작은 공연장에서 직접 소리를 만드는 콤보 앰프입니다.',
            reasons: ['40W에서 20W로 출력을 낮출 수 있는 전환 기능', '12인치 Celestion V-Type 스피커와 두 채널'],
            purpose: '기타 연주',
            place: '연습실 · 작은 무대',
            power: '콘센트 전원 · 22.9kg',
            link: 'products/amplifiers.html'
        }
    };

    function createCell(tag, text, scope) {
        const cell = document.createElement(tag);
        cell.textContent = text;
        if (scope) cell.scope = scope;
        return cell;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('[data-gear-finder]');
        const cards = Array.from(document.querySelectorAll('[data-product-card]'));
        const compareInputs = Array.from(document.querySelectorAll('[data-compare-input]'));
        const comparePanel = document.querySelector('[data-compare-panel]');
        const compareContent = document.querySelector('[data-compare-content]');
        const clearButton = document.querySelector('[data-compare-clear]');

        function renderComparison() {
            if (!comparePanel || !compareContent) return;
            const selected = compareInputs.filter((input) => input.checked).map((input) => input.value);
            comparePanel.hidden = selected.length === 0;
            compareContent.replaceChildren();
            if (!selected.length) return;

            if (selected.length === 1) {
                const hint = document.createElement('p');
                hint.className = 'compare_hint';
                hint.textContent = '한 가지를 더 선택하면 사용 방식의 차이를 표로 볼 수 있습니다.';
                compareContent.append(hint);
                return;
            }

            const table = document.createElement('table');
            const caption = document.createElement('caption');
            caption.className = 'screen_out';
            caption.textContent = '선택한 Marshall 대표 모델의 사용 방식 비교';
            table.append(caption);

            const head = document.createElement('thead');
            const headRow = document.createElement('tr');
            headRow.append(createCell('th', '비교 기준', 'col'));
            selected.forEach((key) => headRow.append(createCell('th', catalog[key].label, 'col')));
            head.append(headRow);
            table.append(head);

            const body = document.createElement('tbody');
            const rows = [['사용 목적', 'purpose'], ['주 사용 공간', 'place'], ['전원·이동 조건', 'power']];
            rows.forEach(([label, property]) => {
                const row = document.createElement('tr');
                row.append(createCell('th', label, 'row'));
                selected.forEach((key) => row.append(createCell('td', catalog[key][property])));
                body.append(row);
            });
            table.append(body);
            compareContent.append(table);
        }

        form?.addEventListener('submit', (event) => {
            event.preventDefault();
            const key = new FormData(form).get('scene');
            const choice = catalog[key];
            const result = form.querySelector('[data-finder-result]');
            if (!choice || !result) return;

            cards.forEach((card) => card.classList.toggle('is-recommended', card.dataset.product === key));
            result.replaceChildren();
            const eyebrow = document.createElement('span');
            eyebrow.textContent = '선택한 장면의 대표 모델';
            const title = document.createElement('strong');
            title.textContent = choice.label;
            const summary = document.createElement('p');
            summary.textContent = choice.summary;
            const reasons = document.createElement('ul');
            choice.reasons.forEach((reason) => {
                const item = document.createElement('li');
                item.textContent = reason;
                reasons.append(item);
            });
            const link = document.createElement('a');
            link.href = choice.link;
            link.textContent = '모델과 공식 사양 확인 →';
            result.append(eyebrow, title, summary, reasons, link);
            result.hidden = false;
            result.focus({ preventScroll: true });
            result.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'nearest' });
        });

        compareInputs.forEach((input) => input.addEventListener('change', renderComparison));
        clearButton?.addEventListener('click', () => {
            compareInputs.forEach((input) => { input.checked = false; });
            renderComparison();
        });
    });
})();
