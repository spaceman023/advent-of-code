let players = 412;
let lastMarbleScore = 71646 * 100;

class Node {
  constructor(value, parent, next) {
    this.value = value;
    this.parent = parent || this;
    this.next = next;
  }
}
class List {
  constructor(head) {
    this.head = head;
    this.tail = head;
    this.length = 1;
    this.current = head;
  }
  print() {
    let node = this.current;
    let arr = [];
    for (let i = 0; i < this.length; i++) {
      arr.push(node.value);
      node = node.next;
    }
  }
  addMarble(value) {
    let temp = this.current.next.next;
    this.current.next.next = new Node(value, this.current.next, temp);
    this.current = this.current.next.next;
    this.current.next.parent = this.current;
    this.length++;
  }
  handle23() {
    this.current =
      this.current.parent.parent.parent.parent.parent.parent.parent.parent;
    let score = this.current.next.value;
    let temp = this.current.next.next;
    this.current.next = temp;
    this.current.next.parent = this.current;
    this.current = this.current.next;
    this.length--;
    return score;
  }
}
let i = new Node(0, null, null);
i.next = new Node(1, i, i);
let l = new List(i);
l.length++;
l.current = i.next;
let scores = {};
let currPlayer = 1;
for (let i = 2; i <= lastMarbleScore; i++) {
  if (!scores[currPlayer]) {
    scores[currPlayer] = 0;
  }
  if (i % 23 === 0) {
    let score = l.handle23();
    let take = i;
    scores[currPlayer] += take + score;
  } else {
    l.addMarble(i);
  }
  if (currPlayer === players) {
    currPlayer = 0;
  }
  currPlayer++;
}
let max = 0;
for (let [, v] of Object.entries(scores)) {
  if (v > max) {
    max = v;
  }
}
console.log(max);
