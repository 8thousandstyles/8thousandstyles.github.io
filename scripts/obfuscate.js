import fs from 'node:fs';
import path from 'node:path';

const KEY_32 = 0x5a5a5a5a;
const KEY_8 = 0x5a;

const inputFile = process.argv[2] || (fs.existsSync('raw_media/1.webm') ? 'raw_media/1.webm' : 'public/1.webm');
const outputFile = process.argv[3] || 'public/assets/matrix_cache.bin';

if (!fs.existsSync(inputFile)) {
  if (fs.existsSync(outputFile)) {
    console.log(`[obfuscate] Output ${outputFile} already exists and source ${inputFile} not found, skipping.`);
    process.exit(0);
  }
  console.error(`[obfuscate] Source file not found: ${inputFile}`);
  process.exit(1);
}

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
console.log(`[obfuscate] Successfully scrambled ${inputFile} -> ${outputFile} (${(u8.length / 1024).toFixed(1)} KB)`);
