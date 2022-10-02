import { importInput } from "./helpers.js";

class checkPassphrases {
  constructor(input) {
    this.input = input.split("\n");
    this.input.pop();
    this.validPassphrasesv1 = 0;
    this.validPassphrasesv2 = 0;
  }
  checkAll() {
    this.input.forEach(line => {
      this.checkLine(line);
    });
  }
  checkLine(line) {
    let words = line.split(" ");
    let unique = [...new Set(words)];
    if (words.length === unique.length) {
      this.validPassphrasesv1++;
    }
    let formatted = words.map(word => word.split("").sort().join(""));
    let uniqueAnagrams = [...new Set(formatted)];
    if (words.length === uniqueAnagrams.length) {
      this.validPassphrasesv2++;
    }
  }
  printValid() {
    console.log(this.validPassphrasesv1);
    console.log(this.validPassphrasesv2);
  }
}

let input = importInput("./inputs/day04-input.txt");
let check = new checkPassphrases(input);

check.checkAll();
check.printValid();
