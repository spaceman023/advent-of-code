const fs = require("fs");
const input = fs.readFileSync("./inputs/day12-input.txt")
let [init, key] = input.toString().split("\n\n")
const firstgen = init.replace("initial state: ", "").split("")
let instructions = {}
key = key.split('\n')
key.pop()
for (let i of key) {
  let [k, v] = i.split(" => ")
  instructions[k] = v
}
let padding = new Array(4).fill(".")
let lastgen = [...padding, ...firstgen, ...padding]
let [prevtotal, lastslope, slope, intersect, streak] = [0, 0, 0, 0, 0];
let pots = 0;
for (let i = 0; i < 5000; i++) {
  let newgen = [...padding, ...lastgen, ...padding]
  for (let j = 2; j < lastgen.length - 3; j++) {
    let sample = lastgen.slice(j - 2, j + 3).join("")
    let pot = instructions[sample] || "."
    if (pot === "#") {
      pots += (j - 2)
    }
    newgen[j] = pot
  }
  console.log(pots, prevtotal)
  slope = pots - prevtotal
  console.log(slope)
  lastgen = [...newgen]
  if (slope - lastslope === 0) {
    streak++
    if (streak > 3) {
      intersect = i
      console.log(intersect, slope)
      break;
    }
  } else {
    streak = 0
  }
  prevtotal = pots
  lastslope = slope
}
console.log(pots + (50_000_000_000 - intersect) * slope)
