/**
 * Convert heavy PNG background images to WebP.
 * Run once: node scripts/convert-to-webp.mjs
 */
import sharp from 'sharp';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const assetsDir = path.resolve(__dirname, '../src/assets');

const images = ['hills.png', 'sky.png'];

for (const file of images) {
  const input  = path.join(assetsDir, file);
  const output = path.join(assetsDir, file.replace('.png', '.webp'));

  const info = await sharp(input)
    .webp({ quality: 82, effort: 6 })
    .toFile(output);

  const inputStat  = (await import('fs')).statSync(input);
  const outputStat = (await import('fs')).statSync(output);
  const saving = ((1 - outputStat.size / inputStat.size) * 100).toFixed(1);

  console.log(
    `✓ ${file} → ${file.replace('.png', '.webp')}` +
    `  ${(inputStat.size / 1024).toFixed(0)} kB → ${(outputStat.size / 1024).toFixed(0)} kB  (−${saving}%)`
  );
}

console.log('\nDone. Update imports in App.tsx to use .webp files.');
