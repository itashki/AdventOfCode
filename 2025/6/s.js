import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  const lines = input.split("\n");
  const operations = lines[lines.length - 1].trim().split(/\s+/);
  const numbers = lines
    .slice(0, -1)
    .map((line) => line.trim().split(/\s+/).map(BigInt));
  return { numbers, operations };
}

/** @param {BigInt[][]} matrix */
function transpose(matrix) {
  return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
}

/** @param {ReturnType<typeof parseInput>} input */
function part1(input) {
  const { numbers, operations } = input;
  const numbersT = transpose(numbers);
  let result = 0n;
  for (let col = 0; col < numbers[0].length; col++) {
    if (operations[col] === "*") {
      result += numbersT[col].reduce((acc, n) => acc * n, 1n);
    } else if (operations[col] === "+") {
      result += numbersT[col].reduce((acc, n) => acc + n, 0n);
    }
  }
  return result;
}

function part2() {
  const input = readFileSync("./input", "utf-8");
  const lines = input.split("\n");
  const operations = lines[lines.length - 2].trim().split(/\s+/);
  const numberLines = lines.slice(0, -2);
  const numberLinesT = numberLines[0].split("").map((_, colIndex) =>
    numberLines
      .map((line) => line[colIndex])
      .filter((c) => /\d/.test(c))
      .join("")
      .trim(),
  );
  const numbers = [];
  let acc = [];
  for (const line of numberLinesT) {
    if (line.length === 0) {
      if (acc.length > 0) {
        numbers.push(acc.map(BigInt));
        acc = [];
      }
      continue;
    }
    acc.push(line);
  }
  if (acc.length > 0) {
    numbers.push(acc.map(BigInt));
  }

  let answer = 0n;
  for (let col = 0; col < numbers.length; col++) {
    if (operations[col] === "*") {
      answer += numbers[col].reduce((acc, n) => acc * n, 1n);
    } else if (operations[col] === "+") {
      answer += numbers[col].reduce((acc, n) => acc + n, 0n);
    }
  }
  return answer;
}

console.log(part1(parseInput(input)));
console.log(part2());
