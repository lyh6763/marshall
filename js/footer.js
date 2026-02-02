(function () {
    'use strict';

    document.addEventListener('DOMContentLoaded', () => {
        const footerSections = document.querySelectorAll('.footer_section h3');

        footerSections.forEach((header) => {
            if (header.closest('.footer_social')) return;

            header.addEventListener('click', () => {
                const section = header.closest('.footer_section');
                const isActive = section.classList.contains('active');

                document.querySelectorAll('.footer_section').forEach((item) => {
                    item.classList.remove('active');
                });

                if (!isActive) {
                    section.classList.add('active');
                }
            });
        });

        function checkScreenSize() {
            const sections = document.querySelectorAll('.footer_section');
            const shouldExpand = window.innerWidth >= 768;

            sections.forEach((section) => {
                section.classList.toggle('active', shouldExpand);
            });
        }

        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
    });
})();
