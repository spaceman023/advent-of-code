const fs = require('fs');
//import ./inputs/day01.txt using fs

// Part 1
// ======
const input = fs.readFileSync('./inputs/day01.txt', 'utf-8').split('\n');
//write a function to process input lines and find the first and last integer of the line (the input line being a string of numbers and letters)
function findFirstAndLastSum(input) {
  input = input.split('').filter((char) => {
    return is_numeric(char);
  });
  console.log(input);
  return Number(input[0] + input[input.length - 1]);
}
function is_numeric(str) {
  return /^\d+$/.test(str);
}
//write a function to find the sum of the first and last number of each line
function partOne(input) {
  let sum = 0;
  input.forEach((line) => {
    sum += findFirstAndLastSum(line);
  });
  return sum;
}

function checkLine(line) {
  let wordToNum = {
    one: '1',
    two: '2',
    three: '3',
    four: '4',
    five: '5',
    six: '6',
    seven: '7',
    eight: '8',
    nine: '9',
  };
  let first = '';
  //get the first word or digit
  let curr = '';
  let keywords = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

  for (let i = 0; i < line.length; i++) {
    if (is_numeric(line[i])) {
      first = line[i];
      break;
    }
    curr += line[i];
    if (keywords.includes(curr)) {
      first = curr;
      if (curr.length > 1) {
        first = wordToNum[curr];
      }
      break;
    }
  }
  //get the last word or digit
  let last = '';
  curr = '';
  for (let i = line.length - 1; i >= 0; i--) {
    if (is_numeric(line[i])) {
      first = line[i];
      break;
    }
    curr = line[i] + curr;
    if (keywords.includes(curr)) {
      last = curr;
      if (curr.length > 1) {
        last = wordToNum[curr];
      }
      break;
    }
  }
  //if either first or last is an empty string make the empty string the same as the other
  if (first === '') {
    first = last;
  }
  if (last === '') {
    last = first;
  }
  console.log(first + last);
  return Number(first + last);
}
function partTwo(input) {
  let sum = 0;
  input.forEach((line) => {
    sum += +checkLine(line);
  });
  return sum;
}

console.log(`Part 1: ${partOne(input)}`);
console.log(`Part 2: ${partTwo(input)}`);
