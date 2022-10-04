import { importInput } from "./helpers.js";
let input = importInput("./inputs/8").split("\n");
input.pop();

class RegisterInstruction {
  constructor(instruction) {
    const [register, operation, value, , conditionRegister, condition, conditionValue] =
      instruction.split(" ");
    this.register = register;
    this.operation = operation === "inc" ? "+" : "-";
    this.value = Number(value);
    this.conditionRegister = conditionRegister;
    this.condition = condition;
    this.conditionValue = Number(conditionValue);
  }
  execute(registers) {
    const conditionRegisterValue = registers[this.conditionRegister] || 0;
    const condition = eval(`${conditionRegisterValue} ${this.condition} ${this.conditionValue}`);
    let newValue = null;
    if (condition) {
      const registerValue = registers[this.register] || 0;
      newValue = eval(`${registerValue} ${this.operation} ${this.value}`);
      registers[this.register] = newValue;
    }
    return newValue;
  }
}
class Register {
  constructor() {
    this.registers = {};
  }
  execute(instruction) {
    const registerInstruction = new RegisterInstruction(instruction);
    const value = registerInstruction.execute(this.registers);
    return value;
  }
  getHighestValue() {
    return Math.max(...Object.values(this.registers));
  }
}
const register = new Register();
let highestValue = 0;
input.forEach(instruction => {
  const value = register.execute(instruction);
  if (value > highestValue) {
    highestValue = value;
  }
});
console.log("Part One", register.getHighestValue());
console.log("Part Two", highestValue);
