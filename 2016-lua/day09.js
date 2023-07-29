const fs = require('fs');
const input = fs.readFileSync('./inputs/9', 'utf-8').toString();
console.log(input.length);

function processLine(line) {
  let out = '';
  for (let i = 0; i < line.length; i++) {
    if (line[i] === '(') {
      let marker = '';
      while (line[i] !== ')') {
        marker += line[i];
        i++;
      }
      marker += ')';
      let [markerLen, markerFreq] = processMarker(marker);
      let markerSubstr = line.substring(i + 1, i + +markerLen + 1);
      for (let i = 0; i < +markerFreq; i++) {
        out += markerSubstr;
      }
      i += +markerLen;
      continue;
    } else {
      out += line[i];
    }
  }
  return out;
}

function processMarker(marker) {
  let parsed = marker.match(/\d+x\d+/i);
  return parsed[0].split('x');
}

function decompress(str) {
  let weights = Array(str.length).fill(1);
  let total_length = 0;

  let in_marker = false;
  let chars = { val: '' };
  let repeat = { val: '' };
  let currFilling;

  for (let i = 0; i < str.length; i++) {
    let char = str[i];
    if (char === '(') {
      in_marker = true;
      chars.val = '';
      repeat.val = '';

      currFilling = chars;
    } else if (in_marker) {
      if (char === 'x') {
        currFilling = repeat;
      } else if (char === ')') {
        in_marker = false;
        let chars_int = +chars.val;
        let repeat_int = +repeat.val;
        for (let c = 1; c <= chars_int; c++) {
          weights[i + c] *= repeat_int;
        }
      } else {
        currFilling.val += char;
      }
    } else {
      total_length += weights[i];
    }
  }
  return total_length;
}

console.log(processLine('X(8x2)(3x3)ABCY'));
console.log(decompress('X(8x2)(3x3)ABCY'));
const part1 = processLine(input).length;
const part2 = decompress(input);
console.log({ part1, part2 });
