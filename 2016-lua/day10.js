const fs = require('fs');
const input = fs.readFileSync('./inputs/10', 'utf8');

class Buckets {
  constructor() {
    this.bots = new Map();
    this.outputs = new Map();
  }
  setBot(bot) {
    this.bots.set(bot.id, bot)
  }
  getBot(id) {
    this.bots.get(id)
  }
  executeInstruction(bot) {
    if (!bot.hasTwo()){
      console.log("Bot does not have required chips.")
      return
    } else {

    }

  }
}

class Bot {
  constructor(id) {
    this.id = id;
    this.holding = [];
    this.givelow = null;
    this.givehigh = null;
  }
  hasTwo() {
    return this.holding.length == 2
  }
  parseInstruction(instruction){
    if (instruction[0] === "v"){

    }

  }

}

let init = initialize(input);
console.log(init)
