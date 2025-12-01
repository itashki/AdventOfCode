import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  return input.split("\n").map((line) => {
    const [command, ...valueS] = line.split("");
    return { command, value: Number(valueS.join("")) };
  });
}

/** @param {ReturnType<typeof parseInput>} input */
function part1(input) {
  let point = 50;
  let answer = 0;
  for (const command of input) {
    if (command.command === "R") {
      point += command.value;
      point %= 100;
    } else if (command.command === "L") {
      point -= command.value;
      if (point < 0) {
        point = (point % 100 + 100) % 100;
      }
    }
    if (point === 0) {
      answer += 1;
    }

  }
  return answer;
}

/** @param {ReturnType<typeof parseInput>} input */
function part2(input) {
  let point = 50;
  let answer = 0;
  for (const command of input) {
    if (command.command === "R") {
      point += command.value;
      answer += Math.floor(point / 100);
      point %= 100;
    } else if (command.command === "L") {
      const wasOnZero = point === 0;
      point -= command.value;
      if (point === 0) {
        answer += 1;
      } else if (point < 0) {
        if (!wasOnZero) {
          answer += 1;
        }
        answer += Math.floor(point / -100);
        point = (point % 100 + 100) % 100;
      }
    }
  }
  return answer;
}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
