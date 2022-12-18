const fs = require('fs');
const input = fs.readFileSync('./input05.txt');
const [crates, instructions] = input.toString().split('\n\n');
let cleaned = [];
for (let c of crates.split('\n').slice(0, -1)) {
  cleaned.push(c.replaceAll('[', '').replaceAll(']', ''));
}
let arrs = [];
for (let i = 0; i < 17; i++) {
  let index_arr = [];
  for (let c of cleaned) {
    if (c[i] != ' ') {
      index_arr.push(c[i]);
    }
  }
  arrs.push(index_arr);
}
arrs = arrs.filter((el) => el.length >= 1);
const parsedInstructions = instructions.split('\n').map((el) => el.match(/\d+/g));
for (let i of parsedInstructions) {
  const [amount, from, to] = i.map((el) => +el - 1);
  for (let j = 0; j <= amount; j++) {
    console.log(from);
    let moved = arrs[from].shift();
    console.log(moved);
    arrs[to].unshift(moved);
  }
}
console.log(arrs.map((el) => el.at(-1)).join(''));
