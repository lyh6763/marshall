(function () {
    'use strict';

    // Concept site: links with href="#" are placeholders with no destination yet.
    // Stop them from jumping to the top of the page when clicked or activated.
    document.addEventListener('DOMContentLoaded', () => {
        const placeholders = document.querySelectorAll('a[href="#"]');

        placeholders.forEach((link) => {
            link.setAttribute('aria-disabled', 'true');
            link.addEventListener('click', (event) => {
                event.preventDefault();
            });
        });
    });
})();
