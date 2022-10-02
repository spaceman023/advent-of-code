//god this sucked
const fs = require("fs");
const input = fs.readFileSync("day04-input.txt");
const lines = input.toString().split("\n");
let guards = {};
let [currTime, currGuard] = parseLine(lines[0]);
currGuard = currGuard.match(/\#\d+/)[0];
guards[currGuard] = {};
guards[currGuard]["awake"] = [];
guards[currGuard]["asleep"] = [];
for (let i = 1; i < lines.length - 1; i++) {
  let [time, action] = parseLine(lines[i]);
  prevTime = currTime;
  currTime = time;
  if (action.includes("Guard")) {
    let g = action.match(/\#\d+/)[0];
    if (currGuard !== g) {
      for (let j = prevTime; j.getMinutes() < 59; j.setTime(j.getTime() + 60000)) {
        guards[currGuard]["awake"].push(j.getMinutes());
      }
    }
    currGuard = g;
    if (!guards[currGuard]) {
      guards[currGuard] = {};
      guards[currGuard]["awake"] = [];
      guards[currGuard]["asleep"] = [];
    }
  } else if (action.includes("falls")) {
    for (let j = prevTime; j.getMinutes() < currTime.getMinutes(); j.setTime(j.getTime() + 60000)) {
      guards[currGuard]["awake"].push(j.getMinutes());
    }
  } else if (action.includes("wake")) {
    for (let j = prevTime; j.getMinutes() < currTime.getMinutes(); j.setTime(j.getTime() + 60000)) {
      guards[currGuard]["asleep"].push(j.getMinutes());
    }
  }
}
function parseLine(line) {
  let [time, action] = line.replace("[", "").split("]");
  time = time.replace(" ", "T") + ":00";
  time = new Date(time);
  return [time, action];
}

function guardStats(guard, guards) {
  let mins = {};
  for (let m of guards[guard].asleep) {
    if (!mins[m]) {
      mins[m] = 1;
    } else {
      mins[m] = mins[m] + 1;
    }
  }
  let mmins = 0;
  let mmin = 0;
  let fmin = 0;
  for (let [k, v] of Object.entries(mins)) {
    if (v > mmins) {
      mmins = v;
      mmin = k;
    }
  }
  return [guard, mmins, mmin];
}

let max = 0;
let maxG = "";
let maxasleep = 0;
let minasleep = 0;
let minguard = 0;
for (let [k, v] of Object.entries(guards)) {
  if (v.asleep.length > max) {
    max = v.asleep.length;
    maxG = k;
  }
  let [a, b, c] = guardStats(k, guards);

  if (b > maxasleep) {
    maxasleep = b;
    minasleep = c;
    minguard = a;
  }
}
console.log(guards);
console.log(minguard, minasleep);
