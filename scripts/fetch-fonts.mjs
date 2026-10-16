// Download the self-hosted Latin web fonts into fonts/ (run: npm run fonts).
// Anton and Montserrat are SIL OFL 1.1, so they may be self-hosted as long as the licence ships with them.
// Korean text uses the visitor's system font (see --font-system in css/reset.css), so no Korean web font is fetched.
import { writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// Google Fonts only returns woff2 to a current browser user agent.
const userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/141.0 Safari/537.36';

const fonts = [
  { file: 'anton-latin.woff2', family: 'Anton', licence: 'anton' },
  // One variable file covers every weight the site uses (500, 700, 800).
  { file: 'montserrat-latin.woff2', family: 'Montserrat:wght@500..800', licence: 'montserrat' },
];

for (const font of fonts) {
  const css = await (await fetch(`https://fonts.googleapis.com/css2?family=${font.family}&display=swap`, {
    headers: { 'User-Agent': userAgent },
  })).text();
  // Each subset comes as "/* latin */ @font-face { ... }"; keep only the basic Latin one.
  const latin = css.split('/* ').find((block) => block.startsWith('latin */'));
  const url = latin?.match(/url\((https:[^)]+\.woff2)\)/)?.[1];
  if (!url) throw new Error(`No Latin woff2 for ${font.family}:\n${css.slice(0, 400)}`);

  const data = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(join(root, 'fonts', font.file), data);
  console.log(`fonts/${font.file}  ${(data.length / 1024).toFixed(1)} KB`);
  console.log(`  unicode-range: ${latin.match(/unicode-range: ([^;]+);/)?.[1]}`);

  const licence = await (await fetch(`https://raw.githubusercontent.com/google/fonts/main/ofl/${font.licence}/OFL.txt`)).text();
  if (!licence.includes('SIL OPEN FONT LICENSE')) throw new Error(`Unexpected licence text for ${font.licence}`);
  await writeFile(join(root, 'fonts', `OFL-${font.licence}.txt`), licence);
}
