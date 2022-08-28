const fs = require("fs");
const input = fs.readFileSync("./inputs/day10-input.txt")
const lines = input.toString().split("\n")
lines.pop()

class Star {
  constructor(pos, vel) {
    this.pos = pos;
    this.vel = vel;
  }
  tick() {
    this.pos = [this.pos[0] + this.vel[0], this.pos[1] + this.vel[1]]
  }
}

let stars = [];
for (let l of lines) {
  let [pos, vel] = l
    .match(/\<(.*?)\>/gm)
    .map(el => el
      .replace(/[<>\s]/gm, "")
      .split(",")
      .map(e => Number(e)))
  stars.push(new Star(pos.map(i => i + 10), vel))
}

let ostars = stars.map(i => new Star(i.pos, i.vel))
let min = Infinity
let minpos = 0

for (let i = 0; i < 100000; i++) {
  for (let s of stars) {
    s.tick()
  }
  let xs = new Set();
  let ys = new Set();
  for (let s of stars) {
    let [x, y] = s.pos;
    xs.add(x);
    ys.add(y);
  }
  let total = xs.size + ys.size
  if (total < min) {
    min = total
    minpos = i
  }
}

for (let i = 0; i <= minpos; i++) {
  for (let o of ostars) {
    o.tick()
  }
}

let coords = {}
let maxX = -Infinity
let maxY = -Infinity
let minX = Infinity
let minY = Infinity

for (let s of ostars) {
  let [x, y] = s.pos
  maxX = Math.max(maxX, x)
  maxY = Math.max(maxY, y)
  minX = Math.min(minX, x)
  minY = Math.min(minY, y)
  coords[`${Math.floor(s.pos[0])}, ${Math.floor(s.pos[1])}`] = true
}

fs.writeFileSync('day10-output.txt', "*", { flag: 'a' });
for (let j = minY - 1; j < maxY + 1; j++) {
  for (let i = minX - 1; i < maxX + 1; i++) {
    if (coords[`${i}, ${j}`]) {
      fs.writeFileSync('day10-output.txt', "#", { flag: 'a' });
    } else {
      fs.writeFileSync('day10-output.txt', ".", { flag: 'a' });
    }
  }
  fs.writeFileSync('day10-output.txt', "\n", { flag: 'a' });
}
console.log(minpos)
