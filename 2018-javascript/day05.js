const fs = require("fs");
let str = fs.readFileSync("day05-input.txt").toString()
str = str.replace("\n", "").split("")
let stack = []
for (let s of str) {
  if (stack.length < 1) {
    stack.push(s)
    continue
  }
  if (stack.at(-1) !== s &&
    (stack.at(-1).toLowerCase() === s || stack.at(-1) === s.toLowerCase())) {
    stack.pop()
  } else {
    stack.push(s)
  }
}
console.log(stack.length)
let alphabet = "abcdefghijklmnopqrstuvwxyz".split("")
let min = Infinity
for (let a of alphabet) {
  let tstr = str.filter(i => i.toLowerCase() !== a)
  stack = [];
  for (let s of tstr) {
    if (stack.length < 1) {
      stack.push(s)
      continue
    }
    if (stack.at(-1) !== s &&
      (stack.at(-1).toLowerCase() === s || stack.at(-1) === s.toLowerCase())) {
      stack.pop()
    } else {
      stack.push(s)
    }
  }
  if (stack.length < min) {
    min = stack.length
  }
}
console.log(min)
