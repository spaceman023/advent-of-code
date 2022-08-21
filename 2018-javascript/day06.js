const fs = require("fs");
const input = fs.readFileSync("day06-input.txt")
const lines = input.toString().split("\n")
let alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
alphabet = alphabet.concat(alphabet.map(i => i.toUpperCase()))
lines.pop()
const coords = lines.map(i => i.split(",").map(y => Number(y)))
for (let c of coords) {
  c.reverse()
}
let maxX = -Infinity, maxY = -Infinity
let minX = Infinity, minY = Infinity
for (let c of coords) {
  let [x, y] = c
  maxX = Math.max(x, maxX)
  maxY = Math.max(y, maxY)
  minX = Math.min(x, minX)
  minY = Math.min(y, minY)
}
let rows = maxX + 100
let cols = maxY + 100
let grid = new Array(rows + 1).fill(new Array(cols + 1).fill(0))
let fgrid = [];
let map = {}
let infinites = new Set()
let near = new Set()
for (let row = 0; row <= rows; row++) {
  for (let col = 0; col <= cols; col++) {
    let ranges = coords.map((c, id) => [getmd(c, [row, col]), alphabet[id]])
    let total = ranges.reduce((a, b) => a + b[0], 0)
    if (total < 10000) {
      near.add(`${row}, ${col}`)
    }
    ranges.sort((a, b) => a[0] - b[0]);
    let closest = ""
    if (ranges[0][0] == ranges[1][0]) {
      closest = "."
    } else if (ranges[0][0] === 0) {
      closest = ranges[0][1]
      //grid[row][col] = ranges[0][1].toUpperCase()
    }
    else closest = ranges[0][1]
    grid[row][col] = closest
    map[closest] = map[closest] + 1 || 1
    if (row == 0 || col == 0 || row == rows || col == cols) {
      infinites.add(closest)
    }
  }
  fgrid.push([...grid[row]])
}
console.log(infinites)
let maxArea = 0
for (let [k, v] of Object.entries(map)) {
  if (!infinites.has(k)) {
    maxArea = Math.max(v, maxArea)
    console.log(k, v)
  }
}
console.log(maxArea)
console.log(near.size)
function getmd(c1, c2) {
  return Math.abs(c1[0] - c2[0]) + Math.abs(c1[1] - c2[1])
}
