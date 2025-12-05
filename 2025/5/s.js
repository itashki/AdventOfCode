import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  const [ranges, ids] = input.split("\n\n");
  return {
    ranges: ranges.split("\n").map(line => {
      const [start, end] = line.split("-").map(Number);
      return { start, end };
    }),
    ids: ids.split("\n").map(Number),
  }
}

/** @param {ReturnType<typeof parseInput>} input */
function part1(input) {
  let count = 0;
  for (const id of input.ids) {
    for (const range of input.ranges) {
      if (id >= range.start && id <= range.end) {
        count++;
        break;
      }
    } 
  }
  return count;
}

/** @param {ReturnType<typeof parseInput>} input */
function part2(input) {
  let bigRange = []
  for (const range of input.ranges) {
    const newBigRange = [];
    if (bigRange.length === 0) {
      bigRange.push(range);
      continue;
    }
    let merged = false;
    for (let i = 0; i < bigRange.length; i++) {
      if (bigRange[i].end < range.start) {
        newBigRange.push(bigRange[i]);
        continue;
      }
      if (bigRange[i].start > range.end) {
        if (!merged) {
          newBigRange.push(range);
          merged = true;
        }
        newBigRange.push(bigRange[i]);
        continue;
      }
      merged = true;
      const newRange = {
        start: Math.min(bigRange[i].start, range.start),
        end: Math.max(bigRange[i].end, range.end),
      }
      while (i + 1 < bigRange.length && bigRange[i + 1].start <= newRange.end) {
        newRange.end = Math.max(newRange.end, bigRange[i + 1].end);
        i++;
      }
      newBigRange.push(newRange);
    }
    if (!merged) {
      newBigRange.push(range);
    }
    bigRange = newBigRange;
  }
  let count = 0;
  for (const range of bigRange) {
    count += range.end - range.start + 1;
  }
  return count;
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
