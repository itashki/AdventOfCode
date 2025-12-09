import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  return input.split("\n").map((line) => {
    const [x, y] = line.split(",").map(Number);
    return { x, y };
  });
}

/**
 * @param {{ x: number; y: number }} a
 * @param {{ x: number; y: number }} b
 */
function squareArea(a, b) {
  return (Math.abs(a.x - b.x) + 1) * (Math.abs(a.y - b.y) + 1);
}

/**
 * @param {{ x: number; y: number }} a
 * @param {{ x: number; y: number }} b
 * @param {{ x: number; y: number }} sqA
 * @param {{ x: number; y: number }} sqB
 */
function doesCrossSquare(a, b, sqA, sqB) {
  const minX = Math.min(sqA.x, sqB.x) + 1;
  const maxX = Math.max(sqA.x, sqB.x) - 1;
  const minY = Math.min(sqA.y, sqB.y) + 1;
  const maxY = Math.max(sqA.y, sqB.y) - 1;
  if (a.x === b.x) {
    if (a.x < minX || a.x > maxX) return false;
    if (a.y < minY && b.y < minY) return false;
    if (a.y > maxY && b.y > maxY) return false;
    return true;
  }
  if (a.y === b.y) {
    if (a.y < minY || a.y > maxY) return false;
    if (a.x < minX && b.x < minX) return false;
    if (a.x > maxX && b.x > maxX) return false;
    return true;
  }
  return false;
}

/** @param {ReturnType<typeof parseInput>} input */
function part1(input) {
  let maxArea = 0;
  for (const pointA of input) {
    for (const pointB of input) {
      maxArea = Math.max(maxArea, squareArea(pointA, pointB));
    }
  }
  return maxArea;
}

/** @param {ReturnType<typeof parseInput>} input */
function part2(input) {
  let maxArea = 0;
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const area = squareArea(input[i], input[j]);
      if (area > maxArea) {
        let crosses = false; 
        for (let k = 0; k < input.length; k++) {
          const l = (k + 1) % input.length;
          if (doesCrossSquare(input[k], input[l], input[i], input[j])) {
            crosses = true;
            break;
          }
        }
        if (!crosses) {
          maxArea = area;
        }
      }
    }
  }
  return maxArea;
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
