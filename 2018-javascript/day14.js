const input = 260321;

class Node {
  constructor(value, previous, next) {
    this.value = value;
    this.previous = previous;
    this.next = next;
  }
  print() {
    console.log(this.value)
  }
};

class List {
  constructor(head, tail) {
    this.head = head;
    this.tail = tail;
    this.head.next = this.tail;
  }

  push(node) {
    this.tail.next = node;
    this.tail = node;
  }

  length() {
    let len = 0;
    let s = this.head;
    while (s.next) {
      s = s.next;
      len++
    }
    return len
  }

  print() {
    let s = this.head;
    while (s.next) {
      console.log(s.value)
      s = s.next;
    }
  }

  at(index) {
    let currentIndex = 0;
    let s = this.head;
    while (currentIndex < index) {
      currentIndex++
      s = s.next;
    }
    return s
  }

  combineRecipes(a, b) {
    const sum = a + b;
    if (sum > 9) {
      const [d1, d2] = sum.toString().split("").map(el => +el)
      const node1 = new Node(d1, null, null);
      const node2 = new Node(d2, null, null);
      this.push(node1);
      this.push(node2);
      return [d1, d2]
    } else {
      const node1 = new Node(sum, null, null);
      this.push(node1);
      return [sum]
    }
  }
  lastX(x) {
    let output = ""
    let len = this.length();
    if (x > len) {
      x = len
    }
    let s = this.at(this.length() - x)
    while (s.next) {
      s = s.next;
      output += s.value.toString()
    }
    return output
  }
};

class Elf {
  constructor(position, list) {
    this.list = list;
    this.currentNode = this.list.at(position);
  }
  move() {
    let steps = 1 + this.currentNode.value;
    while (steps > 0) {
      steps--
      if (!this.currentNode.next) {
        this.currentNode = this.list.head;
      } else {
        this.currentNode = this.currentNode.next;
      }
    }
  }
  give() {
    return this.currentNode.value;
  }
}


let h = new Node(3, null, null);
let t = new Node(7, null, null);
let recipes = new List(h, t)
let elf0 = new Elf(0, recipes);
let elf1 = new Elf(1, recipes);

//part one
//while (recipes.length() < input + 9) {
//  recipes.combineRecipes(elf0.give(), elf1.give())
//  elf0.move();
//  elf1.move();
//}
//console.log(recipes.lastX(10))

//part two
let arr = new Array(input.toString().length).fill(0)
let outputNum = 0
outter: while (outputNum !== input) {
  let addedNodes = recipes.combineRecipes(elf0.give(), elf1.give())
  for (let i = 0; i < addedNodes.length; i++) {
    arr.push(addedNodes[i])
    arr.shift()
    outputNum = Number(arr.join(""))
    if (outputNum == input) break outter;
  }
  elf0.move();
  elf1.move();
}
console.log(recipes.length() - input.toString().length)
