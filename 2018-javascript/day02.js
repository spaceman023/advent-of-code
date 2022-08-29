const fs = require("fs");

const input = fs.readFileSync("day02-input.txt")
const lines = input.toString().split("\n")

let output = []
for (let l of lines) {
  output.push(parseLine(l));
}
console.log(output.filter(i => i[0] > 0).length * output.filter(i => i[1] > 0).length)
function parseLine(line) {
  let map = new Map();
  for (let l of line) {
    if (!(map.get(l))) {
      map.set(l, 0);
    }
    map.set(l, map.get(l) + 1);
  }
  let ret = [0, 0]
  for (let [k, v] of map) {
    if (v == 2) {
      ret[0]++
    }
    if (v == 3) {
      ret[1]++
    }
  }
  return ret;
}

function lineIterations(line) {
  let output = [];
  for (let i = 0; i < line.length; i++) {
    let o = ""
    for (let j = 0; j < line.length; j++) {
      if (j == i) {
        continue
      } else {
        o += line[j];
      }
    }
    output.push(o)
  }
  return output
}
let iterationMap = new Map();
for (let l of lines) {
  for (let i of lineIterations(l)) {
    if (!(iterationMap.get(i))) {
      iterationMap.set(i, 0);
    }
    iterationMap.set(i, iterationMap.get(i) + 1);
  }
}
for (let [k, v] of iterationMap) {
  if (v > 2) {
    console.log(k)
  }
}
