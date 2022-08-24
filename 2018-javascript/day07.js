const fs = require("fs");
const input = fs.readFileSync("./inputs/day07-input.txt")
const lines = input.toString().split("\n")
lines.pop()
let dic = {};
for (let l of lines) {
  let [p, c] = l.split("")
  if (!dic[p]) {
    dic[p] = [[], []];
  }
  if (!dic[c]) {
    dic[c] = [[], []];
  }
  dic[p][0].push(c)
  dic[p][0].sort()
  dic[c][1].push(p)
  dic[c][1].sort()
}
let q = []
for (let k of Object.keys(dic)) {
  if (dic[k][1].length < 1) {
    q.push(k)
  }
}
let final = ""
while (q.length > 0) {
  q = q.filter(i => !final.includes(i))
  q.sort();
  let next;
  for (let a of q) {
    if (dic[a][1].every(i => final.includes(i))) {
      next = a
      break;
    }
  }
  if (!next) {
    next = q[0]
  }
  final = final + (next || "");
  if (dic[next]) {
    q = [...q, ...dic[next][0]]
  }
}
let work = final.split("")
work = work.map(i => [i, i.charCodeAt(0) - 4])
let workers = 5
let working = []
let finished = []
let seconds = 0;
while (work.length > 0 || working.length > 0) {
  seconds++
  addwork: for (let f of work) {
    if (working.length == workers) break;
    let required = dic[f[0]][1]
    let testarr = finished.map(i => i[0])
    for (let r of required) {
      if (!testarr.includes(r)) continue addwork
    }
    working.push(f)
  }
  let worktest = working.map(j => j[0])
  work = work.filter(i => !worktest.includes(i[0]))
  working.forEach(i => i[1]--)
  let done = working.filter(i => i[1] < 1)
  finished = finished.concat(done);
  working = working.filter(i => i[1] > 0)
}
console.log(seconds)
