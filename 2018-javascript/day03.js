const fs = require("fs");
const input = fs.readFileSync("day03-input.txt")
const lines = input.toString().split("\n")
function parseLine(line) {
  let coords = []
  const [id, col, row, w, h] = line.split(",").map(i => Number(i));
  for (let i = row; i < h + row; i++) {
    for (let j = col; j < w + col; j++) {
      coords.push(`${i}, ${j}`)
    }
  }
  return coords
}
let fabric = new Map();
for (let l of lines) {
  for (let c of parseLine(l)) {
    if (!(fabric.get(c))) {
      fabric.set(c, 0);
    }
    fabric.set(c, fabric.get(c) + 1);
  }
}
let count = 0;
for (let [k, v] of fabric) {
  if (v > 1) {
    count++
  }
}
let id = 0;
outter: for (let l of lines) {
  id++
  let claim = parseLine(l);
  for (let c of claim) {
    if (fabric.get(c) > 1) {
      continue outter
    }
  }
  console.log(id);
}
console.log(count);
