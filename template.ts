#!/usr/bin/env bun
import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();
// const test = readFileSync("./test", "utf-8").trim();

function parseInput(input:string) {
  return input.split("\n").map((line) => line.split(""));
}

function part1(input:ReturnType<typeof parseInput>) { }

function part2(input:ReturnType<typeof parseInput>) { }

console.log(part1(parseInput(input)));
console.log(part2(parseInput(input)));
