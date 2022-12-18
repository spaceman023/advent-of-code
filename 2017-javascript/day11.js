import { importInput } from './helpers.js';
let input = importInput('./inputs/11');

const directions = input.split(',');
for (let i = 0; i < directions.length; i++) {
  if (directions[i] === 'n') {
    directions[i] = 'ne';
    directions.splice(i, 0, 'n');
  } else if (directions[i] === 's') {
    directions[i] = 'sw';
    directions.splice(i, 0, 's');
  }
}

let x = 0;
let y = 0;
let z = 0;
let maxDistance = 0;
for (let i = 0; i < directions.length; i++) {
  switch (directions[i]) {
    case 'ne':
      x++;
      y--;
      break;
    case 'n':
      y--;
      z++;
      break;
    case 'nw':
      x--;
      z++;
      break;
    case 'sw':
      x--;
      y++;
      break;
    case 's':
      y++;
      z--;
      break;
    case 'se':
      x++;
      z--;
      break;
  }
  let distance = (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2;
  if (distance > maxDistance) {
    maxDistance = distance;
  }
}
console.log('Part 1: ' + (Math.abs(x) + Math.abs(y) + Math.abs(z)) / 2);
