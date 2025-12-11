import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  const parsed = input.split("\n").map((line) => {
    const [from, toS] = line.split(":");
    const to = toS.trim().split(" ");
    return { from, to };
  });
  const map = new Map();
  for (const { from, to } of parsed) {
    map.set(from, to);
  }
  return map;
}

/** @type {Map<string, number>} */
const waysToMemo = new Map();
/**
 * @param {string} from
 * @param {string} to
 * @param {Map<string, string[]>} map
 */
function waysTo(from, to, map) {
  const key = `${from}|${to}`;
  if (waysToMemo.has(key)) return waysToMemo.get(key);
  if (from === to) return 1;
  if (from === "out") return 0;

  const total = map
    .get(from)
    .reduce((acc, next) => acc + waysTo(next, to, map), 0);

  waysToMemo.set(key, total);
  return total;
}

/** @param {ReturnType<typeof parseInput>} map */
function part1(map) {
  return waysTo("you", "out", map);
}

/** @param {ReturnType<typeof parseInput>} map */
function part2(map) {
  return (
    waysTo("svr", "fft", map) *
      waysTo("fft", "dac", map) *
      waysTo("dac", "out", map) +
    waysTo("svr", "dac", map) *
      waysTo("dac", "fft", map) *
      waysTo("fft", "out", map)
  );
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
