import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  return input.split("\n").map((line) => line.split(""));
}

/** @param {string[][]} input */
function part1(input) {

}

/** @param {string[][]} input */
function part2(input) {

}

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
