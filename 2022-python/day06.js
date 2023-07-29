const fs = require('fs'),
  i = fs.readFileSync('./input06.txt').toString();
for (let a = 0; a < i.length - 13; a++) {
  if (new Set(i.slice(a, a + 14)).size == 14) console.log(a + 14);
}
