import { importInput } from "./helpers.js";
const input = importInput("./inputs/2")
  .split("\n")
  .map(line => line.split(/\s+/));
input.pop();

// Part 1
let partOne = 0;
for (let nums of input) {
  let max = Math.max(...nums);
  let min = Math.min(...nums);
  partOne += max - min;
}
// Part 2
let partTwo = 0;
for (let nums of input) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (i !== j && nums[i] % nums[j] === 0) {
        partTwo += nums[i] / nums[j];
      }
    }
  }
}
console.log("===== Day 2 =====");
console.log("Part One: ", partOne);
console.log("Part Two: ", partTwo);
