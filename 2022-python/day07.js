const fs = require('fs');
const input = fs.readFileSync('./input07.txt');

class Directory {
  constructor(name, parent) {
    this.name = name;
    this.parent = parent || null;
    this.files = [];
    this.children = [];
  }
  addChild(child) {
    if (this.children.includes(child)) {
      return;
    } else {
      this.children.push(child);
    }
  }
  getFullPath() {
    let path = '';
    let currentDirectory = this;
    while (currentDirectory.parent) {
      path = `/${currentDirectory.name}${path}`;
      currentDirectory = currentDirectory.parent;
    }
    return path;
  }
  size() {
    let sum = 0;
    this.files.forEach((file) => {
      sum += file.size;
    });
    this.children.forEach((child) => {
      sum += child.size();
    });
    return sum;
  }
  printTree(indent = 0) {
    console.log(`${'_'.repeat(indent)}${this.name} ${this.size()}`);
    this.files.forEach((file) => {
      console.log(`${'_'.repeat(indent + 2)}${file.name}.${file.extension} ${file.size}`);
    });
    this.children.forEach((child) => {
      child.printTree(indent + 2);
    });
  }
}

class File {
  constructor(name, extension, size) {
    this.name = name;
    this.extension = extension || '';
    this.size = +size;
  }
  static parseFile(inputString) {
    const [size, name, extension] = inputString.split(/\.|\s/);
    return new File(name, extension, +size);
  }
}

class Parser {
  constructor(input) {
    this.input = input;
    this.root = new Directory('root', null);
    this.currentDirectory = this.root;
    this.directories = new Map();
  }
  addFile(fileString) {
    const file = File.parseFile(fileString);
    this.currentDirectory.files.push(file);
  }

  addDirectory(directoryString) {
    const directory = new Directory(directoryString, this.currentDirectory);
    directory.parent.addChild(directory);
    this.directories.set(directory.getFullPath(), directory);
    return directory;
  }

  changeDirectory(directoryString) {
    if (directoryString === '..') {
      this.currentDirectory = this.currentDirectory.parent || this.currentDirectory;
    } else {
      let newDirectory = this.addDirectory(directoryString);
      this.currentDirectory = newDirectory;
    }
  }
  parse() {
    const lines = this.input.toString().split('\n');
    lines.forEach((line) => {
      if (line.includes('$ cd')) {
        this.changeDirectory(line.split(' ')[2]);
      } else if (/^dir/.test(line)) {
        this.addDirectory(line.split(' ')[1]);
      } else if (/^\d/.test(line)) {
        this.addFile(line);
      } else {
      }
    });
  }

  printSizes() {
    for (let [key, value] of this.directories) {
      console.log(`${key} ${value.size()}`);
    }
  }
  sizeUnder(size) {
    let sum = 0;
    for (let [_, value] of this.directories) {
      if (value.size() <= size) {
        sum += value.size();
      }
    }
    console.log(sum);
    return sum;
  }
  freeSpace() {
    let sum = this.directories.get('//').size();
    return 70000000 - sum;
  }
  optimalDelete() {
    let min = Infinity;
    let freeSpace = this.freeSpace();
    let needed = 30000000 - freeSpace;
    let optimal;
    for (let [_, value] of this.directories) {
      let diff = value.size() - needed;
      if (diff < min && diff > 0) {
        min = diff;
        optimal = value;
      }
    }
    console.log(optimal.size());
    return optimal;
  }
}

const parser = new Parser(input);
parser.parse();
parser.sizeUnder(100000);
parser.optimalDelete();
