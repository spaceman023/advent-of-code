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
let padding = new Array(10000).fill(".")
let lastgen = [...padding, ...firstgen, ...padding]
let [prevtotal, lastslope, slope, intersect, streak] = [0, 0, 0, 0, 0];
for (let i = 0; i < 5000; i++) {
  let newgen = [...lastgen]
  for (let j = 0; j < lastgen.length; j++) {
    let sample
    if (j - 2 < 0) {
      sample = [...new Array(1 - j).fill("."), ...lastgen.slice(j, j + 3)].join("")
    } else if (j + 3 > lastgen.length) {
      sample = [...lastgen.slice(j, lastgen.length), ...new Array(lastgen.length - j + 3)].join("")
    } else {
      sample = lastgen.slice(j - 2, j + 3).join("")
    }
    newgen[j] = instructions[sample] || "."
  }
  let total = 0
  for (let j = 0; j < lastgen.length; j++) {
    if (lastgen[j] == "#") {
      total += (j - 10000)
    }
  }
  slope = total - prevtotal
  lastgen = [...newgen]
  if (slope - lastslope === 0) {
    streak++
    if (streak > 3) {
      intersect = i + 1
      break;
    }
  }
  prevtotal = total
  lastslope = slope
}
let total = 0
for (let i = 0; i < lastgen.length; i++) {
  if (lastgen[i] == "#") {
    total += (i - 10000)
  }
}
console.log(total + (50_000_000_000 - intersect) * slope)
