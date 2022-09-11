const fs = require("fs");
const input = fs.readFileSync("./inputs/day12-input.txt")
let [init, key] = input.toString().split("\n\n")
let firstgen = init.replace("initial state: ", "").split("")
let instructions = {}
key = key.split('\n')
key.pop()
for (let i of key) {
  let [k, v] = i.split(" => ")
  instructions[k] = v
}
console.log(instructions)
let padding = new Array(50).fill(".")
let lastgen = [...firstgen, ...padding]
let total = 0
for (let i = 0; i < 20; i++) {
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
  lastgen = [...newgen]
  total += lastgen.filter(i => i == "#").length;
  console.log(newgen.join(""))
}

console.log(total)
