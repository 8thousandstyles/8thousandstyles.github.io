import fs from 'node:fs';
import path from 'node:path';

const KEY_32 = 0x5a5a5a5a;
const KEY_8 = 0x5a;

function scrambleFile(inputFile, outputFile) {
  fs.mkdirSync(path.dirname(outputFile), { recursive: true });
  const buffer = fs.readFileSync(inputFile);
  const u8 = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
  const u32 = new Uint32Array(buffer.buffer, buffer.byteOffset, Math.floor(u8.length / 4));

  for (let i = 0; i < u32.length; i++) {
    u32[i] ^= KEY_32;
  }
  for (let i = u32.length * 4; i < u8.length; i++) {
    u8[i] ^= KEY_8;
  }

  fs.writeFileSync(outputFile, Buffer.from(u8));
  console.log(`[obfuscate] Scrambled ${inputFile} -> ${outputFile} (${(u8.length / 1024).toFixed(1)} KB)`);
}

const argInput = process.argv[2];
const argOutput = process.argv[3];

if (argInput && argOutput) {
  scrambleFile(argInput, argOutput);
} else {
  const rawDir = 'raw_media';
  const outDir = 'public/assets';

  if (!fs.existsSync(rawDir)) {
    console.warn(`[obfuscate] No ${rawDir} directory found.`);
    process.exit(0);
  }

  const files = fs.readdirSync(rawDir).filter(f => f.endsWith('.webm') && !f.includes('backup'));

  if (files.length === 0) {
    console.log('[obfuscate] No .webm files found in raw_media/');
    process.exit(0);
  }

  let defaultProcessed = false;
  for (const file of files) {
    const base = path.parse(file).name;
    const inputPath = path.join(rawDir, file);
    const outputPath = path.join(outDir, `${base}.bin`);
    scrambleFile(inputPath, outputPath);

    if (file === '1.webm') {
      const fallbackPath = path.join(outDir, 'matrix_cache.bin');
      scrambleFile(inputPath, fallbackPath);
      defaultProcessed = true;
    }
  }

  if (!defaultProcessed && files.length > 0) {
    const first = path.join(rawDir, files[0]);
    scrambleFile(first, path.join(outDir, 'matrix_cache.bin'));
  }
}
