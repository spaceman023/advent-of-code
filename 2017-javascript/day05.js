import { importInput } from "./helpers.js";
let input = importInput("./inputs/day05-input.txt")
  .split("\n")
  .map(x => +x);
input.pop();
class Maze {
  constructor(input) {
    this.input = [...input];
    this.steps = 0;
    this.position = 0;
  }
  run() {
    while (this.position >= 0 && this.position < this.input.length) {
      this.steps++;
      let offset = this.input[this.position];
      this.input[this.position] += 1;
      this.position += offset;
    }
    return this.steps;
  }
  run2() {
    while (this.position >= 0 && this.position < this.input.length) {
      this.steps++;
      let offset = this.input[this.position];
      this.input[this.position] += offset >= 3 ? -1 : 1;
      this.position += offset;
    }
    return this.steps;
  }
}
const partOne = new Maze(input).run();
const partTwo = new Maze(input).run2();
console.log(partOne, partTwo);
