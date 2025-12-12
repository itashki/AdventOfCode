import { readFileSync } from "fs";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  const lines = input.split("\n\n");
  const trees = lines
    .at(-1)
    .split("\n")
    .map((line) => {
      const [dimsS, giftsS] = line.split(": ");
      const [height, width] = dimsS.split("x").map(Number);
      const gifts = giftsS.split(" ").map(Number);
      return { height, width, gifts };
    });
  const shapes = lines.slice(0, -1).map((block) => {
    const [id, shapeLines] = block.split(":\n");
    return { id, shape: shapeLines.split("\n").map((line) => line.split("")) };
  });
  return { trees, shapes };
}

/** @param {ReturnType<typeof parseInput>} input */
function solve({ trees, shapes }) {
  const area = shapes.map((shape) =>
    shape.shape.reduce(
      (acc, line) => acc + line.filter((n) => n === "#").length,
      0,
    ),
  );
  return trees.filter((tree) => {
    const giftsArea = tree.gifts.reduce(
      (acc, gift, id) => acc + area[id] * gift,
      0,
    );
    return tree.height * tree.width > giftsArea;
  }).length;
}

console.log(solve(parseInput(input)));
