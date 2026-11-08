/**
 * Re-compresses photos in public/assets (in place) with sharp.
 * Run: node scripts/compress-images.mjs
 */
import sharp from 'sharp';
import { readdirSync, statSync, writeFileSync, renameSync } from 'node:fs';
import { join } from 'node:path';

const DIR = join(process.cwd(), 'public', 'assets');

for (const name of readdirSync(DIR)) {
  const p = join(DIR, name);
  if (!statSync(p).isFile()) continue;
  const ext = name.toLowerCase().split('.').pop();
  const tmp = join(DIR, `tmp-${name}`);
  const sizeBefore = statSync(p).size;
  let buf;
  try {
    if (ext === 'jpg' || ext === 'jpeg') {
      const { width } = await sharp(p).metadata();
      let img = sharp(p);
      if (width > 1600) img = img.resize({ width: 1600 });
      buf = await img.jpeg({ quality: 78, mozjpeg: true, progressive: true }).toBuffer();
    } else if (ext === 'webp') {
      buf = await sharp(p).webp({ quality: 82 }).toBuffer();
    } else if (ext === 'png') {
      const palette = /logo|favicon/.test(name.toLowerCase());
      buf = palette
        ? await sharp(p).png({ palette: true }).toBuffer()
        : await sharp(p).png({ optimizationLevel: 9 }).toBuffer();
    } else {
      continue;
    }
  } catch (e) {
    console.log(`! ${name}: ${e.message}`);
    continue;
  }

  if (buf && buf.length < sizeBefore) {
    writeFileSync(tmp, buf);
    renameSync(tmp, p);
    console.log(`${name}: ${(sizeBefore / 1024).toFixed(0)} KB -> ${(buf.length / 1024).toFixed(0)} KB`);
  } else {
    console.log(`${name}: already optimal`);
  }
}

console.log('done');
