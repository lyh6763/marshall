import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, resolve, dirname, relative } from 'node:path';

const root = process.cwd();
const failures = [];

function walk(directory) {
  return readdirSync(directory).flatMap((name) => {
    if (name === '.git' || name === 'node_modules') return [];
    const file = join(directory, name);
    return statSync(file).isDirectory() ? walk(file) : [file];
  });
}

const files = walk(root);
const htmlFiles = files.filter((file) => extname(file) === '.html');
const cssFiles = files.filter((file) => extname(file) === '.css');
const jsFiles = files.filter((file) => extname(file) === '.js');
const voidElements = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr',
]);

const referencedAssets = new Set();

function report(file, message) {
  failures.push(`${relative(root, file).replaceAll('\\', '/')}: ${message}`);
}

function localPath(file, reference) {
  const clean = reference.split('#')[0].split('?')[0];
  if (!clean || /^(?:https?:|mailto:|tel:|data:)/.test(clean)) return null;
  return clean.startsWith('/') ? resolve(root, `.${clean}`) : resolve(dirname(file), clean);
}

for (const file of htmlFiles) {
  const source = readFileSync(file, 'utf8');
  const ids = [...source.matchAll(/\bid="([^"]+)"/g)].map((match) => match[1]);
  const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
  if (duplicateIds.length) report(file, `duplicate IDs: ${[...new Set(duplicateIds)].join(', ')}`);
  if ((source.match(/<h1\b/gi) ?? []).length !== 1) report(file, 'must contain exactly one h1');
  if ((source.match(/<main\b/gi) ?? []).length !== 1) report(file, 'must contain exactly one main');
  if (/href="#"/.test(source)) report(file, 'placeholder href="#" found');
  if (/href="javascript:/i.test(source)) report(file, 'javascript: href found');

  const structuralSource = source
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<(script|style)\b[^>]*>[\s\S]*?<\/\1>/gi, '');
  const stack = [];
  for (const match of structuralSource.matchAll(/<\/?([a-z][\w:-]*)\b[^>]*>/gi)) {
    const tag = match[1].toLowerCase();
    if (voidElements.has(tag) || /\/>$/.test(match[0])) continue;
    if (!match[0].startsWith('</')) {
      stack.push(tag);
      continue;
    }
    const openTag = stack.pop();
    if (openTag !== tag) {
      report(file, `HTML nesting mismatch: expected </${openTag ?? 'none'}>, found </${tag}>`);
      break;
    }
  }
  if (stack.length) report(file, `unclosed HTML tag(s): ${stack.join(', ')}`);

  for (const match of source.matchAll(/href="#([^"]+)"/g)) {
    if (!ids.includes(match[1])) report(file, `missing fragment target #${match[1]}`);
  }

  for (const match of source.matchAll(/\bhref="([^"]+)"/g)) {
    const reference = match[1];
    const target = localPath(file, reference);
    if (target && !existsSync(target)) report(file, `missing local link ${reference}`);
    if (target && existsSync(target) && reference.includes('#') && extname(target) === '.html') {
      const fragment = reference.split('#')[1].split('?')[0];
      const targetSource = readFileSync(target, 'utf8');
      if (fragment && !new RegExp(`\\bid="${fragment.replace(/[.*+?^${}()|[\\]\\]/g, '\\$&')}"`).test(targetSource)) {
        report(file, `missing cross-page fragment target ${reference}`);
      }
    }
  }

  for (const match of source.matchAll(/<(?:img|script|link|source)[^>]+(?:src|href)="([^"]+)"[^>]*>/g)) {
    const target = localPath(file, match[1]);
    if (target) referencedAssets.add(target);
    if (target && !existsSync(target)) report(file, `missing local asset ${match[1]}`);
  }

  for (const match of source.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
      const target = localPath(file, candidate.trim().split(/\s+/)[0]);
      if (target) referencedAssets.add(target);
      if (target && !existsSync(target)) report(file, `missing srcset asset ${candidate.trim()}`);
    }
  }

  for (const match of source.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="[^"]*"/.test(match[0])) report(file, `image missing alt: ${match[0]}`);
    if (!/\bwidth="\d+"/.test(match[0]) || !/\bheight="\d+"/.test(match[0])) report(file, 'image missing width/height');
  }
}

for (const file of cssFiles) {
  const source = readFileSync(file, 'utf8').replace(/\/\*[\s\S]*?\*\//g, '');
  const open = (source.match(/\{/g) ?? []).length;
  const close = (source.match(/\}/g) ?? []).length;
  if (open !== close) report(file, `unbalanced braces ${open}/${close}`);

  for (const match of source.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) {
    const target = localPath(file, match[1]);
    if (target) referencedAssets.add(target);
    if (target && !existsSync(target)) report(file, `missing local asset ${match[1]}`);
  }
}

// Every shipped stylesheet, script and image must be used by a page or stylesheet.
for (const file of files) {
  const folder = relative(root, file).split(/[\\/]/)[0];
  if (['css', 'js', 'img'].includes(folder) && !referencedAssets.has(file)) report(file, 'unused asset (not referenced by any HTML or CSS)');
}

for (const file of jsFiles) {
  const source = readFileSync(file, 'utf8');
  try {
    Function(source);
  } catch (error) {
    report(file, error.message || 'JavaScript syntax error');
  }
}

if (failures.length) {
  console.error(`Validation failed (${failures.length})`);
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log(`Validation passed: ${htmlFiles.length} HTML, ${cssFiles.length} CSS, ${jsFiles.length} JS files.`);
