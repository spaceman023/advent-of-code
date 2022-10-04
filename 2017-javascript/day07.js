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
  findUnbalancedDisc(disc = this.getRoot()) {
    const children = disc.children.map(child => this.getDisc(child));
    const weights = children.map(child => this.getWeight(child));
    const weightSet = new Set(weights);
    if (weightSet.size === 1) {
      return disc;
    }
    const unbalancedWeight = [...weightSet].find(
      weight => weights.filter(w => w === weight).length === 1,
    );
    const unbalancedDisc = children.find(child => this.getWeight(child) === unbalancedWeight);
    return this.findUnbalancedDisc(unbalancedDisc);
  }
  balance() {
    const disc = this.findUnbalancedDisc();
    return (
      disc.weight -
      Math.abs(
        this.getWeight(
          disc.parent.children
            .map(child => this.getDisc(child))
            .find(child => child.name !== disc.name),
        ) - this.getWeight(disc),
      )
    );
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
console.log("Part 2:", tower.balance(tower.findUnbalancedDisc(root)));
