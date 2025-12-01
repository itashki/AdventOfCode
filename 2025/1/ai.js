#!/usr/bin/env node
import { readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

function main() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const inputPath = path.join(__dirname, 'input');
  let raw;
  try {
    raw = readFileSync(inputPath, 'utf8');
  } catch (err) {
    console.error('Failed to read input file at', inputPath);
    console.error(err.message);
    process.exit(1);
  }

  const lines = raw
    .split(/\r?\n/) 
    .map(s => s.trim())
    .filter(s => s.length > 0);

  let pos = 50; // starting position
  let endZeros = 0; // method 1: end-of-rotation zeros
  let clickZeros = 0; // method 0x434C49434B: zeros during any click

  for (const line of lines) {
    const m = line.match(/^([LR])(\d+)$/);
    if (!m) {
      // Ignore malformed lines but continue processing others
      continue;
    }
    const dir = m[1];
    const dist = Number(m[2]);

    const delta = dir === 'R' ? dist : -dist;

    // Count zeros during clicks: compute how many times we pass 0
    // Moving left decreases position, moving right increases.
    if (delta !== 0) {
      if (delta > 0) {
        // Right rotation: zeros when pos + k ≡ 0 (mod 100) for 1<=k<=delta
        const stepToZero = (100 - pos) % 100; // clicks to next 0
        let crosses;
        if (stepToZero === 0) {
          crosses = Math.floor(delta / 100);
        } else if (delta >= stepToZero) {
          crosses = 1 + Math.floor((delta - stepToZero) / 100);
        } else {
          crosses = 0;
        }
        clickZeros += crosses;
      } else {
        // Left rotation: zeros when pos - k ≡ 0 (mod 100) for 1<=k<=-delta
        const dist = -delta;
        const stepToZero = pos % 100; // clicks to reach 0 when moving left
        let crosses;
        if (stepToZero === 0) {
          crosses = Math.floor(dist / 100);
        } else if (dist >= stepToZero) {
          crosses = 1 + Math.floor((dist - stepToZero) / 100);
        } else {
          crosses = 0;
        }
        clickZeros += crosses;
      }
    }

    pos = ((pos + delta) % 100 + 100) % 100; // wrap 0..99

    if (pos === 0) endZeros++;
  }

  // Output both answers: first method (end-of-rotation), then method 0x434C49434B
  console.log(endZeros.toString());
  console.log(clickZeros.toString());
}

main();
