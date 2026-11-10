// 배포할 사이트 파일만 _site/로 모은다. GitHub Actions 배포와 로컬 점검이 같은 스크립트를 쓴다.
// 사용: node scripts/build-site.mjs [출력 폴더]   (기본 _site)
//
// 들어가는 것: 루트와 products/의 HTML, 페이지가 쓰는 자산 폴더(css·js·img·fonts) 전체.
// 빠지는 것: docs/, scripts/, package*.json, 린트 설정, .editorconfig, .claude/ 등 사이트가 쓰지 않는 파일.
// 다 모은 뒤 모든 HTML·CSS의 로컬 참조가 출력 폴더 안에 있는지 검사하고, 없으면 실패한다.
//
// Windows Node 24에서는 한글이 든 경로에 fs.rmSync·fs.cpSync를 recursive로 쓰면 프로세스가 오류 없이 끝나므로
// 폴더 지우기와 복사는 파일 단위로 직접 돈다.
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmdirSync, statSync, unlinkSync } from 'node:fs';
import { dirname, extname, isAbsolute, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(fileURLToPath(new URL('..', import.meta.url)));
const out = resolve(root, process.argv[2] ?? '_site');
const SITE_URL = 'https://lyh6763.github.io/marshall/';
const PAGE_DIRS = ['.', 'products'];
const ASSET_DIRS = ['css', 'js', 'img', 'fonts'];

const toPosix = (path) => path.replaceAll('\\', '/');
// child가 parent 안(같은 폴더 제외)에 있는지
const inside = (parent, child) => {
    const rel = relative(parent, child);
    return rel !== '' && !rel.startsWith('..') && !isAbsolute(rel);
};

// 출력 폴더는 지우고 다시 만든다. 소스 폴더나 그 상위, 이전 빌드가 아닌 폴더는 지우지 않는다.
const sourceDirs = [...ASSET_DIRS, 'products'].map((dir) => resolve(root, dir));
if (out === root || inside(out, root) || sourceDirs.some((dir) => dir === out || inside(dir, out))) {
    throw new Error(`Refusing to build into ${out}: it overlaps the source files.`);
}
if (existsSync(out) && readdirSync(out).length > 0) {
    const looksBuilt = existsSync(join(out, 'index.html')) && !existsSync(join(out, 'package.json')) && !existsSync(join(out, '.git'));
    if (!looksBuilt) throw new Error(`Refusing to clear ${out}: it is not empty and does not look like an earlier site build.`);
}

function removeTree(directory) {
    if (!existsSync(directory)) return;
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
        const path = join(directory, entry.name);
        if (entry.isDirectory()) removeTree(path);
        else unlinkSync(path);
    }
    rmdirSync(directory);
}

const copied = [];

function copyFile(rel) {
    const target = join(out, rel);
    mkdirSync(dirname(target), { recursive: true });
    copyFileSync(join(root, rel), target);
    copied.push(toPosix(rel));
}

function copyTree(rel) {
    for (const entry of readdirSync(join(root, rel), { withFileTypes: true })) {
        const child = join(rel, entry.name);
        if (entry.isDirectory()) copyTree(child);
        else copyFile(child);
    }
}

removeTree(out);
mkdirSync(out, { recursive: true });

for (const dir of PAGE_DIRS) {
    for (const name of readdirSync(join(root, dir))) {
        const rel = join(dir, name);
        if (extname(name) === '.html' && statSync(join(root, rel)).isFile()) copyFile(rel);
    }
}
for (const dir of ASSET_DIRS) copyTree(dir);

// ---- 모은 결과 검사 ----

const problems = [];
let checked = 0;

function walk(directory) {
    return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
        const path = join(directory, entry.name);
        return entry.isDirectory() ? walk(path) : [path];
    });
}

function checkReference(file, reference) {
    const clean = reference.trim().split('#')[0].split('?')[0];
    if (!clean) return; // 같은 페이지 앵커(#top 등)
    let target;
    if (clean.startsWith(SITE_URL)) {
        target = join(out, decodeURI(clean.slice(SITE_URL.length)));
    } else if (clean.startsWith('/marshall/')) {
        target = join(out, decodeURI(clean.slice('/marshall/'.length)));
    } else if (/^[a-z][a-z\d+.-]*:/i.test(clean) || clean.startsWith('//')) {
        return; // 외부 주소, mailto:, data: 등
    } else if (clean.startsWith('/')) {
        problems.push(`${toPosix(relative(out, file))}: root-absolute path ${reference} breaks under the /marshall/ subpath`);
        return;
    } else {
        target = resolve(dirname(file), decodeURI(clean));
    }
    if (clean.endsWith('/') || (existsSync(target) && statSync(target).isDirectory())) target = join(target, 'index.html');
    checked += 1;
    if (!inside(out, target)) {
        problems.push(`${toPosix(relative(out, file))}: ${reference} points outside the built site`);
    } else if (!existsSync(target)) {
        problems.push(`${toPosix(relative(out, file))}: ${reference} is missing from the built site (${toPosix(relative(out, target))})`);
    }
}

const builtFiles = walk(out);
for (const file of builtFiles) {
    const source = readFileSync(file, 'utf8');
    if (extname(file) === '.html') {
        const html = source.replace(/<!--[\s\S]*?-->/g, '');
        for (const match of html.matchAll(/\b(?:href|src)="([^"]+)"/g)) checkReference(file, match[1]);
        for (const match of html.matchAll(/\b(?:srcset|imagesrcset)="([^"]+)"/g)) {
            for (const candidate of match[1].split(',')) checkReference(file, candidate.trim().split(/\s+/)[0]);
        }
        // og:image·og:url 같은 메타는 배포 주소로 적으므로 그 주소가 가리키는 파일도 사이트 안에 있어야 한다.
        for (const match of html.matchAll(/\bcontent="([^"]+)"/g)) {
            if (match[1].startsWith(SITE_URL)) checkReference(file, match[1]);
        }
    } else if (extname(file) === '.css') {
        const css = source.replace(/\/\*[\s\S]*?\*\//g, '');
        for (const match of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) checkReference(file, match[1]);
    }
}

if (problems.length) {
    console.error(`Site build failed (${problems.length})`);
    problems.forEach((problem) => console.error(`- ${problem}`));
    process.exit(1);
}

const pages = copied.filter((file) => file.endsWith('.html'));
console.log(`Built ${toPosix(relative(root, out)) || out}: ${copied.length} files (${pages.length} HTML: ${pages.join(', ')}), ${checked} local references checked.`);
