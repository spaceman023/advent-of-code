const fs = require('fs');
const input = fs.readFileSync('./inputs/day04.txt', 'utf-8');

class Ticket {
  constructor(id, winners, numbers) {
    this.id = id;
    this.winners = winners;
    this.numbers = numbers;
    this.score = this.calculateScore();
    this.matches = this.getMatches();
    this.children = this.getChildren();
    this.ticketsWon = 0;
  }

  calculateScore() {
    let score = 0;
    let matchFound = false;

    this.numbers.forEach((number) => {
      if (this.winners.includes(number)) {
        if (matchFound) {
          score *= 2;
        } else {
          score = 1;
          matchFound = true;
        }
      }
    });
    return score;
  }

  getChildren() {
    const children = [];
    for (let i = 1; i <= this.matches; i++) {
      children.push(Number(this.id) + i).toString();
    }
    return children;
  }

  getMatches() {
    let matches = 0;
    this.numbers.forEach((number) => {
      if (this.winners.includes(number)) {
        matches++;
      }
    });
    return matches;
  }
}

function parseTicketData(data) {
  const tickets = {};

  const lines = data.split('\n');

  lines.forEach((line) => {
    const parts = line.split(': ');
    const id = parts[0].split(/\s+/)[1];
    const numbers = parts[1].split(' | ').map((el) => el.trim());
    const winners = numbers[0].split(/\s+/g).map(Number);
    const allNumbers = numbers[1].split(/\s+/g).map(Number);

    tickets[id] = new Ticket(id, winners, allNumbers);
  });

  return tickets;
}

function calculateTotalScore(tickets) {
  let totalScore = 0;

  Object.values(tickets).forEach((ticket) => {
    totalScore += ticket.score;
  });

  return totalScore;
}

function calculateTotalTicketsWon(tickets) {
  let totalTicketsWon = Object.keys(tickets).length;
  let toProcess = Object.keys(tickets);
  while (toProcess.length) {
    let currTicket = tickets[toProcess.pop()];
    totalTicketsWon += currTicket.matches;
    toProcess = toProcess.concat(currTicket.children.map((child) => child.toString()));
  }
  return totalTicketsWon;
}

const tickets = parseTicketData(input);
console.log(calculateTotalScore(tickets));
console.log(calculateTotalTicketsWon(tickets));
