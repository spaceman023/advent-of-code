const fs = require('fs');
const input = fs.readFileSync('./inputs/6', 'utf-8').split('\n').map(x => x.split(""));

input.pop();
const mostCommon = [];
const leastCommon = [];
for (let i = 0; i < input[0].length; i++){
    let letterCount = {};
    for (let j = 0; j < input.length; j++) {
        if (letterCount[input[j][i]] === undefined) {
            letterCount[input[j][i]] = 1;
        } else {
            letterCount[input[j][i]]++;
        }
    }
    let max = 0;
    let maxLetter = "";
    let min = 100000;
    let minLetter = "";
    for (let letter in letterCount) {
        if (letterCount[letter] > max) {
            max = letterCount[letter];
            maxLetter = letter;
        }
    }
    for (let letter in letterCount) {
        if (letterCount[letter] >= 1 && letterCount[letter] < min) {
            min = letterCount[letter];
            minLetter = letter;
            console.log(min, minLetter);
        }
    }
    mostCommon.push(maxLetter);
    leastCommon.push(minLetter);
}
console.log(mostCommon.join(""));
console.log(leastCommon.join(""));
