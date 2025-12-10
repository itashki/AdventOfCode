import { readFileSync } from "fs";
import { init } from "z3-solver";

const input = readFileSync("./input", "utf-8").trim();

/** @param {string} input */
function parseInput(input) {
  return input.split("\n").map((line) => {
    const [, indicatorsS, buttonsS, joltageS] = line.match(
      /^\[([.#]+)\] ((?:\([0-9,]+\) )+){(.+)}$/,
    );
    const indicators = indicatorsS;
    const joltage = joltageS.split(",").map(Number);
    const buttons = buttonsS
      .trim()
      .split(" ")
      .map((btn) => btn.slice(1, -1).split(",").map(Number));
    return { indicators, buttons, joltage };
  });
}

/**
 * @param {string} state
 * @param {number[]} button
 */
function pressButton(state, button) {
  let newState = state.split("");
  for (const idx of button) {
    newState[idx] = newState[idx] === "." ? "#" : ".";
  }
  return newState.join("");
}

/** @param {ReturnType<typeof parseInput>} input */
function part1(input) {
  let sum = 0;

  outer: for (const { indicators, buttons } of input) {
    const achieved = new Set([".".repeat(indicators.length)]);
    let current = [".".repeat(indicators.length)];
    for (let steps = 1; ; steps++) {
      const next = [];
      for (const state of current) {
        for (const button of buttons) {
          const newState = pressButton(state, button);
          if (!achieved.has(newState)) {
            if (newState === indicators) {
              sum += steps;
              continue outer;
            }
            achieved.add(newState);
            next.push(newState);
          }
        }
      }
      current = next;
    }
  }

  return sum;
}

/**
 * @param {number[]} state
 * @param {number[]} button
 */
function pressJoltage(state, button) {
  const newState = [...state];
  for (const idx of button) {
    newState[idx]++;
  }
  return newState;
}

/** @param {ReturnType<typeof parseInput>} input */
async function part2(input) {
  let sum = 0;
  for (const { joltage, buttons } of input) {
    const { Context } = await init();
    const Z3 = Context("main");
    const { Int, Optimize } = Z3;

    const vars = buttons.map((_, i) => Int.const(`x${i}`));
    const opt = new Optimize();
    for (const v of vars) {
      opt.add(v.ge(0));
    }

    for (let i = 0; i < joltage.length; i++) {
      /** @type {import("z3-solver").Arith<"main">} */
      let expr = Int.val(0);
      for (let j = 0; j < buttons.length; j++) {
        if (buttons[j].includes(i)) {
          expr = expr.add(vars[j]);
        }
      }
      opt.add(expr.eq(joltage[i]));
    }

    const totalPresses = vars.reduce((a, v) => a.add(v), Int.val(0));
    opt.minimize(totalPresses);

    const result = await opt.check();

    const model = opt.model();
    sum += parseInt(model.eval(totalPresses).toString(), 10);
  }

  return sum;
}

console.log(part1(parseInput(input)));
part2(parseInput(input)).then(console.log);
