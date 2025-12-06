import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  return input.split(",").map((rangeS) => {
    const [start, end] = rangeS.split("-").map(Number);
    return { start, end };
  });
}

/** @param {ReturnType<typeof parseInput>} input */
function part1(input) {
  let count = 0;
  for (const range of input) {
    for (let n = range.start; n <= range.end; n++) {
      if (/^(\d+)\1$/.test(n.toString())) {
        count += n;
      }
    }
  }
  return count;
}

/** @param {ReturnType<typeof parseInput>} input */
function part2(input) {
  let count = 0;
  for (const range of input) {
    for (let n = range.start; n <= range.end; n++) {
      if (/^(\d+)\1+$/.test(n.toString())) {
        count += n;
      }
    }
  }
  return count;
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
