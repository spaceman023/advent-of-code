import { importInput } from "./helpers.js";
const input = importInput("./inputs/1");
function findDuplicates(str = "") {
  let arr = str
    .trim()
    .split("")
    .filter((el, index, arr) => {
      if (index === arr.length - 1) {
        return el === arr[0];
      } else {
        return el === arr[index + 1];
      }
    });
  return arr.reduce((a, b) => +a + +b, 0);
}

function findOffsetDuplicates(str = "") {
  let arr = str
    .trim()
    .split("")
    .filter((el, index, arr) => {
      let offset = arr.length / 2;
      if (index + offset >= arr.length) {
        return el === arr[offset - (arr.length - index)];
      } else {
        return el === arr[index + offset];
      }
    });
  return arr.reduce((a, b) => +a + +b, 0);
}

let partOne = findDuplicates(input);
let partTwo = findOffsetDuplicates(input);
console.log("===== Day 1 =====");
console.log("Part One: ", partOne);
console.log("Part Two: ", partTwo);
