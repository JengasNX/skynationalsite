/**
 * Downloads self-hosted Onest variable woff2 subsets.
 * Run once: node scripts/fetch-onest.mjs
 */
import { writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUT = join(process.cwd(), 'public', 'assets', 'fonts');
const HEADERS = { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/126.0 Safari/537.36' };

const css = await fetch('https://fonts.googleapis.com/css2?family=Onest:wght@100..900&display=swap', { headers: HEADERS })
  .then((r) => r.text());

// split css into subset blocks
const blocks = [...css.matchAll(/\/\* ([\w-]+) \*\/\s*@font-face \{([^}]+)\}/g)];
const wanted = new Set(['cyrillic', 'cyrillic-ext', 'latin', 'latin-ext']);

for (const [, subset, body] of blocks) {
  if (!wanted.has(subset)) continue;
  const url = body.match(/url\((https:[^)]+)\)/)?.[1];
  if (!url) continue;
  const buf = Buffer.from(await fetch(url).then((r) => r.arrayBuffer()));
  const file = join(OUT, `Onest-${subset}.woff2`);
  writeFileSync(file, buf);
  console.log(`${subset}: ${Math.round(buf.length / 1024)} KB -> ${file}`);
}
console.log('done');
