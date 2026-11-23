const input = 281474976710737;

/** @param {number} n */
function part1(n) {
  let sum = 0;
  for (let i = 1; i <= Math.sqrt(n - 1); i++) {
    if ((n - 1) % i === 0) {
      if (i % 2 === 0) {
        sum += i / 2;
      }
      if (((n - 1) / i) % 2 === 0) {
        sum += (n - 1) / i / 2;
      }
    }
  }
  return sum;
}

/** @param {number} n */
function part2(n) {
  const halfN = (n - 1) / 2;
  let sum = 0;
  for (let i = 1; i <= Math.sqrt(n - 1); i++) {
    if ((n - 1) % i === 0) {
      if (i % 2 === 0) {
        sum += i % halfN;
      }
      if (((n - 1) / i) % 2 === 0) {
        sum += (n - 1) / i % halfN;
      }
    }
  }
  return sum;
}

console.log(part1(input)); 
console.log(part2(input));
