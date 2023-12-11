const fs = require('fs');
const input = fs.readFileSync('./inputs/day03.txt', 'utf-8').split('\n');
const schematic = input.map((line) => {
  return line.split('');
});
const width = schematic[0].length;
const height = schematic.length;

// Part 1
let directions = [
  [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ],
];
let currNum = '';
let validNum = false;
let partNums = [];
let gearMap = {};
let currSymbol = '';
let gearCoord = '';
let symbols = ['*', '#', '+', '*', '$', '%', '^', '&', '!', '/', '|', '-', '_', '=', '@', '~', '`', '(', ')', '[', ']', '{', '}', '<', '>'];
for (let i = 0; i < height; i++) {
  for (let j = 0; j < width; j++) {
    let val = schematic[i][j];
    if (val === '.' || symbols.includes(val)) {
      if (validNum) {
        if (currSymbol === '*') {
          if (gearMap[gearCoord]) {
            gearMap[gearCoord].push(+currNum);
          } else {
            gearMap[gearCoord] = [+currNum];
          }
        }
        partNums.push(+currNum);
      }
      validNum = false;
      currNum = '';
      currSymbol = '';
      gearCoord = '';
      continue;
    } else if (val.match(/\d/)) {
      currNum += val;
      outter: for (let d of directions) {
        for (let dir of d) {
          let x = j + dir[0];
          let y = i + dir[1];
          if (x >= 0 && x < width && y >= 0 && y < height) {
            let check = schematic[y][x];
            if (symbols.includes(check)) {
              if (check === '*') {
                gearCoord = `${x},${y}`;
              }
              currSymbol = check;
              validNum = true;
              break outter;
            }
          }
        }
      }
    }
  }
}
//iterate through the gearMap and multiply the numbers for each gear entry that has exactly two numbers together then sum all the gear products together
let gearProducts = [];
for (let key in gearMap) {
  if (gearMap[key].length === 2) {
    gearProducts.push(gearMap[key].reduce((acc, curr) => acc * curr, 1));
  }
}
let sum = partNums.reduce((acc, curr) => {
  return acc + curr;
});

console.log(sum);
console.log(gearProducts.reduce((acc, curr) => acc + curr));
