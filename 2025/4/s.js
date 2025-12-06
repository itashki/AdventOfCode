import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  return input.split("\n").map((line) => line.split(""));
}

/**
 * @param {ReturnType<typeof parseInput>} input
 * @param {{ row: number; col: number }} point
 */
function countNeighbors(input, point) {
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];
  let count = 0;
  for (const [dr, dc] of directions) {
    const newRow = point.row + dr;
    const newCol = point.col + dc;
    if (input[newRow]?.[newCol] === "@") {
      count++;
    }
  }
  return count;
}

/** @param {ReturnType<typeof parseInput>} input */
function part1(input) {
  let answer = 0;
  for (let row = 0; row < input.length; row++) {
    for (let col = 0; col < input[0].length; col++) {
      if (input[row][col] === "@") {
        if (countNeighbors(input, { row, col }) < 4) {
          answer++;
        }
      }
    }
  }
  return answer;
}

/** @param {ReturnType<typeof parseInput>} input */
function part2(input) {
  let answer = 0;
  let didRemove = false;
  do {
    const toRemove = [];
    didRemove = false;
    for (let row = 0; row < input.length; row++) {
      for (let col = 0; col < input[row].length; col++) {
        if (input[row][col] === "@") {
          if (countNeighbors(input, { row, col }) < 4) {
            answer++;
            toRemove.push({ row, col });
            didRemove = true;
          }
        }
      }
    }
    for (const { row, col } of toRemove) {
      input[row][col] = ".";
    }
  } while (didRemove);
  return answer;
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
