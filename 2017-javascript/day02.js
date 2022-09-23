import { importInput } from "./helpers.js";
const input = importInput("./inputs/day02-input.txt")
  .split("\n")
  .map((line) => line.split(/\s+/));
input.pop();

// Part 1
let sum = 0;
for (let nums of input) {
  let max = Math.max(...nums);
  let min = Math.min(...nums);
  sum += max - min;
}
console.log(sum);
// Part 2
sum = 0;
for (let nums of input) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i !== j && nums[i] % nums[j] === 0) {
        sum += nums[i] / nums[j];
      }
    }
  }
}
console.log(sum);
