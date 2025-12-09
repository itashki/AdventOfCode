import { createCanvas } from "canvas";
import { readFileSync, writeFileSync } from "fs";

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
  return Math.abs(a.x - b.x + 1) * Math.abs(a.y - b.y + 1);
}

/** @param {number[]} arr */
function compress(arr) {
  const sorted = Array.from(new Set(arr)).sort((a, b) => a - b);
  const rankMap = new Map();
  sorted.forEach((val, idx) => {
    rankMap.set(val, idx);
  });
  return arr.map((val) => rankMap.get(val));
}

/** @param {ReturnType<typeof parseInput>} input */
function part2(input) {
  const xs = input.map((p) => p.x);
  const ys = input.map((p) => p.y);
  const compX = compress(xs);
  const compY = compress(ys);
  const compPoints = input.map((p, i) => ({ x: compX[i], y: compY[i] }));

  const maxX = Math.max(...compX);
  const maxY = Math.max(...compY);

  const grid = Array.from({ length: maxY + 1 }, () =>
    Array.from({ length: maxX + 1 }, () => 0),
  );

  for (let i = 0; i < compPoints.length - 1; i++) {
    grid[compPoints[i].y][compPoints[i].x] = 1;
    if (compPoints[i].x === compPoints[i + 1].x) {
      for (
        let y = Math.min(compPoints[i].y, compPoints[i + 1].y) + 1;
        y < Math.max(compPoints[i].y, compPoints[i + 1].y);
        y++
      ) {
        grid[y][compPoints[i].x] = 1;
      }
    } else {
      for (
        let x = Math.min(compPoints[i].x, compPoints[i + 1].x) + 1;
        x < Math.max(compPoints[i].x, compPoints[i + 1].x);
        x++
      ) {
        grid[compPoints[i].y][x] = 1;
      }
    }
  }
  grid[compPoints[compPoints.length - 1].y][
    compPoints[compPoints.length - 1].x
  ] = 1;
  if (compPoints[0].x === compPoints[compPoints.length - 1].x) {
    for (
      let y =
        Math.min(compPoints[0].y, compPoints[compPoints.length - 1].y) + 1;
      y < Math.max(compPoints[0].y, compPoints[compPoints.length - 1].y);
      y++
    ) {
      grid[y][compPoints[0].x] = 1;
    }
  } else {
    for (
      let x =
        Math.min(compPoints[0].x, compPoints[compPoints.length - 1].x) + 1;
      x < Math.max(compPoints[0].x, compPoints[compPoints.length - 1].x);
      x++
    ) {
      grid[compPoints[0].y][x] = 1;
    }
  }

  const queue = [];
  queue.push({ x: 100, y: 100 });
  while (queue.length > 0) {
    const { x, y } = queue.shift();
    if (x < 0 || x > maxX || y < 0 || y > maxY) continue;
    if (grid[y][x] !== 0) continue;
    grid[y][x] = 2;
    queue.push({ x: x + 1, y });
    queue.push({ x: x - 1, y });
    queue.push({ x, y: y + 1 });
    queue.push({ x, y: y - 1 });
  }

  const canvas = createCanvas(maxX + 1, maxY + 1);
  const ctx = canvas.getContext("2d");

  for (let y = 0; y <= maxY; y++) {
    for (let x = 0; x <= maxX; x++) {
      if (grid[y][x] === 1) {
        ctx.fillStyle = "red";
      } else if (grid[y][x] === 2) {
        ctx.fillStyle = "green";
      } else {
        ctx.fillStyle = "white";
      }
      ctx.fillRect(x, y, 1, 1);
    }
  }

  const buffer = canvas.toBuffer("image/png");
  writeFileSync("./output2.png", buffer);

  let maxArea = 0;
  for (let i = 0; i < input.length - 1; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const area = squareArea(input[i], input[j]);
      if (area > maxArea) {
        const compA = compPoints[i];
        const compB = compPoints[j];
        let hasOutside = false;
        for (let y = Math.min(compA.y, compB.y); y <= Math.max(compA.y, compB.y); y++) {
          for (let x = Math.min(compA.x, compB.x); x <= Math.max(compA.x, compB.x); x++) {
            if (grid[y][x] === 0) {
              hasOutside = true;
              break;
            }
          }
          if (hasOutside) break;
        }
        if (!hasOutside) {
          maxArea = area;
        }
      }
    }
  }
  return maxArea;
}

console.log(part2(parseInput(input)));
