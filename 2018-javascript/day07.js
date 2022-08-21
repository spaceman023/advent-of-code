const fs = require("fs");
const input = fs.readFileSync("day07-input.txt")
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
console.log(final)
