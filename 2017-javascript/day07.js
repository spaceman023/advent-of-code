import { importInput } from "./helpers.js";
const input = importInput("./inputs/7");
class Disc {
  constructor(name, weight, children) {
    this.name = name;
    this.weight = weight;
    this.children = children;
    this.parent = null;
  }
  setParent(parent) {
    this.parent = parent;
  }
}
class Tower {
  constructor(input) {
    const inputRegex = /(\w+)\s\(([0-9]*)(\)\s->\s(.*))?/gm;
    const discs = [...input.matchAll(inputRegex)];
    this.discs = new Map();
    this.init(discs);
  }
  addDisc(disc) {
    this.discs.set(disc.name, disc);
  }
  getDisc(name) {
    return this.discs.get(name);
  }
  getRoot() {
    for (const disc of this.discs.values()) {
      if (disc.parent === null) {
        return disc;
      }
    }
  }
  getWeight(disc) {
    let weight = disc.weight;
    for (const child of disc.children) {
      weight += this.getWeight(this.getDisc(child));
    }
    return weight;
  }
  calculateBalance(disc) {
    let weights = [];
    for (const child of disc.children) {
      weights.push(this.getWeight(this.getDisc(child)));
    }
    const uniqueWeights = [...new Set(weights)];
    if (uniqueWeights.length === 1) {
      return disc.weight;
    }
    const wrongWeight = uniqueWeights.find(
      weight => weights.filter(w => w === weight).length === 1,
    );
    const wrongDisc = this.getDisc(disc.children[weights.indexOf(wrongWeight)]);
    return this.calculateBalance(wrongDisc);
  }
  init(discs) {
    for (const disc of discs) {
      let [, name, weight, , children] = disc;
      const discObj = new Disc(name, Number(weight), children ? children.split(", ") : []);
      this.addDisc(discObj);
    }
    for (const disc of this.discs.values()) {
      for (const child of disc.children) {
        this.getDisc(child).setParent(disc);
      }
    }
  }
}
const tower = new Tower(input);
const root = tower.getRoot();
console.log("Part 1:", root.name);
console.log("Part 2:", tower.calculateBalance(root));
