(function () {
    'use strict';

    const catalog = {
        headphones: {
            label: 'Headphones',
            summary: '이동 중이거나 혼자 집중할 때 가장 가까운 거리에서 믹스를 전달합니다.',
            scene: '출퇴근 · 개인 작업 · 야간 청취',
            scale: '개인',
            mobility: '높음',
            link: 'products/headphones.html'
        },
        speakers: {
            label: 'Speakers',
            summary: '거실과 작업실을 함께 듣는 공간으로 바꾸는 균형 잡힌 선택입니다.',
            scene: '집 · 스튜디오 · 소규모 모임',
            scale: '공간',
            mobility: '중간',
            link: 'products/speakers.html'
        },
        amplifiers: {
            label: 'Amplifiers',
            summary: '연주와 리허설, 무대에서 직접 소리를 만들고 밀어내는 출발점입니다.',
            scene: '연습실 · 리허설 · 무대',
            scale: '퍼포먼스',
            mobility: '낮음',
            link: 'products/amplifiers.html'
        }
    };

    function createCell(tag, text) {
        const cell = document.createElement(tag);
        cell.textContent = text;
        return cell;
    }

    document.addEventListener('DOMContentLoaded', () => {
        const form = document.querySelector('[data-gear-finder]');
        const cards = Array.from(document.querySelectorAll('[data-product-card]'));
        const compareInputs = Array.from(document.querySelectorAll('[data-compare-input]'));
        const comparePanel = document.querySelector('[data-compare-panel]');
        const compareContent = document.querySelector('[data-compare-content]');
        const clearButton = document.querySelector('[data-compare-clear]');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

        function renderComparison() {
            if (!comparePanel || !compareContent) return;

            const selected = compareInputs.filter((input) => input.checked).map((input) => input.value);
            comparePanel.hidden = selected.length === 0;
            compareContent.replaceChildren();

            if (!selected.length) return;

            if (selected.length === 1) {
                const hint = document.createElement('p');
                hint.className = 'compare_hint';
                hint.textContent = '한 가지를 더 선택하면 차이를 표로 비교할 수 있습니다.';
                compareContent.append(hint);
                return;
            }

            const table = document.createElement('table');
            const caption = document.createElement('caption');
            caption.className = 'screen_out';
            caption.textContent = '선택한 Marshall 장비군 비교';
            table.append(caption);

            const rows = [
                ['장비군', ...selected.map((key) => catalog[key].label)],
                ['추천 장면', ...selected.map((key) => catalog[key].scene)],
                ['청취 규모', ...selected.map((key) => catalog[key].scale)],
                ['이동성', ...selected.map((key) => catalog[key].mobility)]
            ];

            const body = document.createElement('tbody');
            rows.forEach((row, rowIndex) => {
                const tableRow = document.createElement('tr');
                row.forEach((value, cellIndex) => {
                    const tag = cellIndex === 0 || rowIndex === 0 ? 'th' : 'td';
                    const cell = createCell(tag, value);
                    if (tag === 'th') cell.scope = cellIndex === 0 ? 'row' : 'col';
                    tableRow.append(cell);
                });
                body.append(tableRow);
            });

            table.append(body);
            compareContent.append(table);
        }

        form?.addEventListener('submit', (event) => {
            event.preventDefault();
            const data = new FormData(form);
            const context = data.get('context');
            const priority = data.get('priority');
            const result = form.querySelector('[data-finder-result]');

            const ranked = cards.map((card) => {
                const contextScore = card.dataset.contexts.split(' ').includes(context) ? 2 : 0;
                const priorityScore = card.dataset.priorities.split(' ').includes(priority) ? 2 : 0;
                return { card, score: contextScore + priorityScore };
            }).sort((a, b) => b.score - a.score);

            const winner = ranked[0].card;
            const key = winner.dataset.product;

            cards.forEach((card) => card.classList.toggle('is-recommended', card === winner));

            if (result) {
                result.hidden = false;
                result.replaceChildren();

                const eyebrow = document.createElement('span');
                eyebrow.textContent = 'Recommended signal';
                const strong = document.createElement('strong');
                strong.textContent = catalog[key].label;
                const copy = document.createElement('p');
                copy.textContent = catalog[key].summary;
                const link = document.createElement('a');
                link.href = catalog[key].link;
                link.textContent = '추천 장비 자세히 보기 →';

                result.append(eyebrow, strong, copy, link);
                result.focus({ preventScroll: true });
            }

            winner.scrollIntoView({
                behavior: reducedMotion.matches ? 'auto' : 'smooth',
                block: 'center'
            });
        });

        compareInputs.forEach((input) => input.addEventListener('change', renderComparison));
        clearButton?.addEventListener('click', () => {
            compareInputs.forEach((input) => { input.checked = false; });
            renderComparison();
        });
    });
})();
