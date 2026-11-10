import js from '@eslint/js';
import { defineConfig } from 'eslint/config';
import globals from 'globals';

export default defineConfig([
    { ignores: ['_site/'] },
    js.configs.recommended,
    {
        // 페이지가 <script src>로 읽는 브라우저 스크립트(모듈이 아닌 IIFE)
        files: ['js/**/*.js'],
        languageOptions: {
            sourceType: 'script',
            globals: globals.browser,
        },
    },
    {
        // 검사·빌드·글꼴 받기 스크립트와 도구 설정 파일은 Node에서 돈다.
        files: ['**/*.mjs'],
        languageOptions: {
            sourceType: 'module',
            globals: globals.node,
        },
    },
]);
