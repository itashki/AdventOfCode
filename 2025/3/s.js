import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  return input.split("\n").map((line) => line.split("").map(Number));
}

/** @param {ReturnType<typeof parseInput>} input */
function part1(input) {
  let answer = 0;
  for (const bank of input) {
    let maxFirst = bank[0];
    let earliestFirst = 0;
    for (let i = 1; i < bank.length - 1; i++) {
      if (bank[i] > maxFirst) {
        maxFirst = bank[i];
        earliestFirst = i;
      }
      if (maxFirst === 9) break;
    }
    let maxLast = bank[earliestFirst + 1];
    let earliestLast = earliestFirst + 1;
    for (let i = earliestFirst + 2; i < bank.length; i++) {
      if (bank[i] > maxLast) {
        maxLast = bank[i];
        earliestLast = i;
      }
      if (maxLast === 9) break;
    }
    answer += maxFirst * 10 + maxLast;
  }
  return answer;
}

/** @param {ReturnType<typeof parseInput>} input */
function part2(input) {
    let answer = 0;
  for (const bank of input) {
    let prevIndex = -1;
    const maxDigits = Array(12).fill(0);
    for (let digit = 1; digit <= 12; digit++){
      let maxDigit = bank[prevIndex + 1];
      let maxDigitIndex = prevIndex + 1;
      for (let i = prevIndex + 2; i < bank.length - (12 - digit); i++) {
        if (bank[i] > maxDigit) {
          maxDigit = bank[i];
          maxDigitIndex = i;
        }
        if (maxDigit === 9) break;
      }
      prevIndex = maxDigitIndex;
      maxDigits[digit - 1] = maxDigit;
    }
    answer += Number(maxDigits.join(""));
  }
  return answer;
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
