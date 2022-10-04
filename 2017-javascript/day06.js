import { importInput } from "./helpers.js";
const input = importInput("./inputs/6");
class Bank {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}
class Banks {
  constructor(input) {
    this.head = null;
    this.history = [];
    this.steps = 0;
    this.input = input;
    this.init();
  }
  init() {
    let banks = this.input.split(/\s+/).map(Number);
    banks.pop();
    let head = new Bank(banks[0]);
    let current = head;
    for (let i = 1; i < banks.length; i++) {
      current.next = new Bank(banks[i]);
      current = current.next;
    }
    current.next = head;
    this.head = head;
  }
  getHighest() {
    let current = this.head;
    let highest = current;
    while (current.next !== this.head) {
      if (current.next.value > highest.value) {
        highest = current.next;
      }
      current = current.next;
    }
    return highest;
  }
  redistribute() {
    let highest = this.getHighest();
    let current = highest;
    let value = highest.value;
    highest.value = 0;
    while (value > 0) {
      current = current.next;
      current.value++;
      value--;
    }
  }
  getHash() {
    let current = this.head;
    let hash = "";
    while (current.next !== this.head) {
      hash += current.value + ",";
      current = current.next;
    }
    hash += current.value;
    return hash;
  }
  run() {
    while (true) {
      let hash = this.getHash();
      if (this.history.includes(hash)) {
        return this.steps;
      }
      this.history.push(hash);
      this.redistribute();
      this.steps++;
    }
  }
}
const banks = new Banks(input);
const partOne = banks.run();
const partTwo = partOne - banks.history.indexOf(banks.getHash());
console.log("===== Day 6 =====");
console.log("Part One:", partOne);
console.log("Part Two:", partTwo);
