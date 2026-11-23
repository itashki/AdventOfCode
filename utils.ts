export const dirsArr = [
  { x: 0, y: -1 }, // north
  { x: 1, y: -1 }, // north-east
  { x: 1, y: 0 }, // east
  { x: 1, y: 1 }, // south-east
  { x: 0, y: 1 }, // south
  { x: -1, y: 1 }, // south-west
  { x: -1, y: 0 }, // west
  { x: -1, y: -1 }, // north-west
];
export const dirsObj = {
  north: { x: 0, y: -1 },
  "north-east": { x: 1, y: -1 },
  east: { x: 1, y: 0 },
  "south-east": { x: 1, y: 1 },
  south: { x: 0, y: 1 },
  "south-west": { x: -1, y: 1 },
  west: { x: -1, y: 0 },
  "north-west": { x: -1, y: -1 },
};

export function printMatrix<T>(matrix: T[][]) {
  console.log(matrix.map((row) => row.join("")).join("\n"));
}

export function getMatrix<T>(
  rows: number,
  cols: number,
  value: T | ((i: number, j: number) => T),
) {
  if (value instanceof Function) {
    return Array.from({ length: rows }, (_, i) =>
      Array.from({ length: cols }, (_, j) => value(i, j)),
    );
  }
  return Array.from({ length: rows }, () => Array(cols).fill(value));
}

export function dbg<T>(value: T) {
  console.log(value);
  return value;
}
