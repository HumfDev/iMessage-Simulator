#!/usr/bin/env node
/**
 * Write conversation props for Remotion render.
 * Usage: node scripts/write-props.mjs < props.json
 * Or: node scripts/write-props.mjs path/to/downloaded-props.json
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outPath = join(root, 'out', 'props.json');
mkdirSync(join(root, 'out'), { recursive: true });

const arg = process.argv[2];
let raw;
if (arg) {
  raw = readFileSync(arg, 'utf8');
} else {
  raw = readFileSync(0, 'utf8');
}

const parsed = JSON.parse(raw);
if (!parsed.conversation) {
  writeFileSync(outPath, JSON.stringify({ conversation: parsed }, null, 2));
} else {
  writeFileSync(outPath, JSON.stringify(parsed, null, 2));
}
console.log(`Wrote ${outPath}`);
