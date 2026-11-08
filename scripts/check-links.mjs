/**
 * Link checker: scans dist HTML files for local href/src references
 * and verifies the target file exists in dist.
 * Usage: node scripts/check-links.mjs
 */
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, resolve, basename, dirname } from 'node:path';

const DIST = resolve(process.cwd(), 'dist');
const files = [];

(function walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    const st = statSync(p);
    if (st.isDirectory()) walk(p);
    else if (p.endsWith('.html')) files.push(p);
  }
})(DIST);

/** A directory target only exists if it holds index.html (i.e., .../index.html in same dir). */
function targetExists(fromFile, targetPath) {
  // targetPath is a URL path like /skynationalsite/about/ or /skynationalsite/assets/x.jpg
  if (targetPath.endsWith('/')) {
    return existsSync(join(DIST, targetPath, 'index.html'));
  }
  return existsSync(join(DIST, targetPath));
}

let broken = 0;
const htmlPattern = /(?:href|src)="([^"]+)"/g;

for (const file of files) {
  const html = readFileSync(file, 'utf8');
  let m;
  htmlPattern.lastIndex = 0;
  while ((m = htmlPattern.exec(html))) {
    const raw = m[1];
    if (
      !raw ||
      raw.startsWith('#') ||
      raw.startsWith('mailto:') ||
      raw.startsWith('tel:') ||
      raw.startsWith('data:') ||
      raw.startsWith('//')
    ) continue;

    let url = raw;
    // strip hash query
    url = url.split('#')[0].split('?')[0];
    if (!url) continue;

    // external?
    if (/^https?:\/\//i.test(url)) {
      if (/https?:\/\/(localhost|127\.)/i.test(url)) {
        console.log(`[EXTERNAL-DEV] ${raw} in ${file}`);
        broken++;
      }
      continue;
    }

    if (!url.startsWith('/')) {
      console.log(`[RELATIVE] ${raw} in ${file}`);
      continue;
    }

    // base is /skynationalsite — strip it, everything lives inside dist
    const sliced = url.replace(/^\/skynationalsite\/?/, '/').replace(/\/$/, '') || '/';
    const exists = sliced === '/'
      ? existsSync(join(DIST, 'index.html'))
      : targetExists(null, sliced);

    if (!exists) {
      console.log(`[BROKEN] ${raw} -> ${file}`);
      broken++;
    }
  }
}

console.log(broken === 0 ? 'OK: no broken local links' : `${broken} problem(s)`);
process.exit(broken ? 1 : 0);
