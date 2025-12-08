import { readFileSync } from "fs";

const PART1_ITERATIONS = 1000;

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  return input.split("\n").map((line) => {
    const [x, y, z] = line.split(",").map(Number);
    return { x, y, z };
  });
}

/**
 * @param {{ x: number; y: number; z: number }} a
 * @param {{ x: number; y: number; z: number }} b
 */
function distance(a, b) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2 + (a.z - b.z) ** 2);
}

/** @param {ReturnType<typeof parseInput>} input */
function calculateDistances(input) {
  /** @type {{ i: number; j: number; distance: number }[]} */
  const distances = [];
  for (let i = 0; i < input.length; i++) {
    for (let j = i + 1; j < input.length; j++) {
      const dist = distance(input[i], input[j]);
      distances.push({ i, j, distance: dist });
    }
  }
  distances.sort((a, b) => a.distance - b.distance);
  return distances;
}

/** @param {ReturnType<typeof parseInput>} input */
function part1(input) {
  const distances = calculateDistances(input);

  /** @type {Set<number>[]} */
  const circuits = [];

  for (let k = 0; k < PART1_ITERATIONS; k++) {
    const { i, j } = distances[k];
    let circuitI = -1;
    let circuitJ = -1;
    for (let c = 0; c < circuits.length; c++) {
      if (circuits[c].has(i)) {
        circuitI = c;
        continue;
      }
      if (circuits[c].has(j)) {
        circuitJ = c;
        continue;
      }
    }
    if (circuitI === -1 && circuitJ === -1) {
      const newCircuit = new Set();
      newCircuit.add(i);
      newCircuit.add(j);
      circuits.push(newCircuit);
    } else if (circuitI === circuitJ) {
      continue;
    } else if (circuitI !== -1 && circuitJ === -1) {
      circuits[circuitI].add(j);
    } else if (circuitI === -1 && circuitJ !== -1) {
      circuits[circuitJ].add(i);
    } else {
      circuits[circuitI] = circuits[circuitI].union(circuits[circuitJ]);
      circuits.splice(circuitJ, 1);
    }
  }

  circuits.sort((a, b) => b.size - a.size);
  return circuits[0].size * circuits[1].size * circuits[2].size;
}

/** @param {ReturnType<typeof parseInput>} input */
function part2(input) {
  const distances = calculateDistances(input);

  /** @type {Set<number>[]} */
  const circuits = [];
  let lastI = -1;
  let lastJ = -1;

  for (let k = 0; circuits[0]?.size !== input.length; k++) {
    const { i, j } = distances[k];
    lastI = i;
    lastJ = j;
    let circuitI = -1;
    let circuitJ = -1;
    for (let c = 0; c < circuits.length; c++) {
      if (circuits[c].has(i)) {
        circuitI = c;
        continue;
      }
      if (circuits[c].has(j)) {
        circuitJ = c;
        continue;
      }
    }
    if (circuitI === -1 && circuitJ === -1) {
      const newCircuit = new Set();
      newCircuit.add(i);
      newCircuit.add(j);
      circuits.push(newCircuit);
    } else if (circuitI === circuitJ) {
      continue;
    } else if (circuitI !== -1 && circuitJ === -1) {
      circuits[circuitI].add(j);
    } else if (circuitI === -1 && circuitJ !== -1) {
      circuits[circuitJ].add(i);
    } else {
      circuits[circuitI] = circuits[circuitI].union(circuits[circuitJ]);
      circuits.splice(circuitJ, 1);
    }
  }

  return input[lastI].x * input[lastJ].x;
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
