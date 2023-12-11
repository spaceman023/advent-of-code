const fs = require('fs');
const input = fs.readFileSync('./inputs/day02.txt', 'utf-8').split('\n');

class Pull {
  constructor(str) {
    this.num = +str.match(/\d+/)[0];
    this.color = str.match(/[a-z]+/)[0];
  }
}

class Group {
  constructor(str) {
    this.pulls = str.split(',').map((pull) => {
      return new Pull(pull);
    });
  }
  isPossible(limit) {
    let reds = 0;
    let greens = 0;
    let blues = 0;
    this.pulls.forEach((pull) => {
      if (pull.color === 'red') {
        reds += pull.num;
      } else if (pull.color === 'green') {
        greens += pull.num;
      } else if (pull.color === 'blue') {
        blues += pull.num;
      }
    });
    return reds <= limit.reds && greens <= limit.greens && blues <= limit.blues;
  }
}

class Limit {
  constructor(reds, greens, blues) {
    this.reds = reds;
    this.greens = greens;
    this.blues = blues;
  }
}

class Game {
  constructor(line) {
    this.id = +line.match(/\d+/)[0];
    this.groups = line
      .split(': ')[1]
      .split(';')
      .map((group) => {
        return new Group(group);
      });
  }
  isPossible(limit) {
    let possible = true;
    this.groups.forEach((group) => {
      if (!group.isPossible(limit)) {
        possible = false;
      }
    });
    return possible;
  }
  mins() {
    let mins = [0, 0, 0];
    this.groups.forEach((group) => {
      let curr = [0, 0, 0];
      group.pulls.forEach((pull) => {
        if (pull.color === 'red') {
          curr[0] += pull.num;
        } else if (pull.color === 'green') {
          curr[1] += pull.num;
        } else if (pull.color === 'blue') {
          curr[2] += pull.num;
        }
      });
      for (let i = 0; i < 3; i++) {
        if (curr[i] > mins[i]) {
          mins[i] = curr[i];
        }
      }
    });
    return mins;
  }
  square() {
    let mins = this.mins();
    return mins[0] * mins[1] * mins[2];
  }
}

let limit = new Limit(12, 13, 14);
let total = 0;
for (let i = 0; i < input.length; i++) {
  input[i] = new Game(input[i]);
  if (input[i].isPossible(limit)) {
    total += input[i].id;
  }
}
console.log(total);

let total2 = 0;
for (let i = 0; i < input.length; i++) {
  total2 += input[i].square();
}

console.log(total2);
