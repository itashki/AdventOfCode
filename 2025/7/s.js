import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/**
 * @param {string} input
 * @returns {(string | number)[][]}
 */
function parseInput(input) {
  return input.split("\n").map((line) => line.split(""));
}

/** @param {ReturnType<typeof parseInput>} input */
function part1(input) {
  const enterPoint = input[0].indexOf("S");
  let count = 0;
  input[1][enterPoint] = "|";
  for (let i = 2; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      if (input[i - 1][j] === "|") {
        if (input[i][j] === ".") {
          input[i][j] = "|";
        } else if (input[i][j] === "^") {
          input[i][j + 1] = "|";
          input[i][j - 1] = "|";
          count++;
        }
      }
    }
  }
  return count;
}

/** @param {ReturnType<typeof parseInput>} input */
function part2(input) {
  const enterPoint = input[0].indexOf("S");
  input[1][enterPoint] = 1;
  for (let i = 2; i < input.length; i++) {
    for (let j = 0; j < input[i].length; j++) {
      const prev = input[i - 1][j],
        curr = input[i][j],
        left = input[i][j - 1],
        right = input[i][j + 1];
      if (typeof prev === "number") {
        if (curr === ".") {
          input[i][j] = prev;
        } else if (typeof curr === "number") {
          input[i][j] = curr + prev;
        } else if (curr === "^") {
          if (typeof right === "number") {
            input[i][j + 1] = right + prev;
          } else {
            input[i][j + 1] = prev;
          }
          if (typeof left === "number") {
            input[i][j - 1] = left + prev;
          } else {
            input[i][j - 1] = prev;
          }
        }
      }
    }
  }
  return input[input.length - 1].reduce(
    /** @param {number} acc */ (acc, n) => {
      if (typeof n === "number") return acc + n;
      return acc;
    },
    0,
  );
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
