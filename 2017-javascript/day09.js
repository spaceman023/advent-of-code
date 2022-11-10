import { importInput } from './helpers.js';
let input = importInput('./inputs/9');
class TreeNode {
  constructor(parent) {
    this.children = [];
    this.garbage = '';
    this.parent = parent || null;
  }
}
class Tree {
  constructor(input) {
    this.root = new TreeNode();
    this.currentNode = this.root;
    this.parse(input);
  }
  parse(input) {
    let i = 0;
    while (i < input.length) {
      switch (input[i]) {
        case '{':
          let newNode = new TreeNode(this.currentNode);
          this.currentNode.children.push(newNode);
          this.currentNode = newNode;
          break;
        case '}':
          this.currentNode = this.currentNode.parent;
          break;
        case '<':
          let garbage = '';
          i++;
          while (input[i] !== '>') {
            if (input[i] === '!') {
              i += 2;
            } else {
              garbage += input[i];
              i++;
            }
          }
          this.currentNode.garbage += garbage;
          break;
      }
      i++;
    }
  }
  getScore(node = this.root, depth = 0) {
    let score = depth;
    for (let child of node.children) {
      score += this.getScore(child, depth + 1);
    }
    return score;
  }
  getGarbageCount(node = this.root) {
    let count = node.garbage.length;
    for (let child of node.children) {
      count += this.getGarbageCount(child);
    }
    return count;
  }
}
let tree = new Tree(input);
console.log('===== Day 9 =====');
console.log('Part One:', tree.getScore());
console.log('Part Two:', tree.getGarbageCount());
