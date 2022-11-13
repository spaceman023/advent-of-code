input = open("./inputs/8", "r").read().splitlines()


class Console:
    def __init__(self, input):
        self.input = input
        self.accumulator = 0
        self.pointer = 0
        self.executed = set()

    def run(self) -> tuple[bool, int]:
        while self.pointer not in self.executed:
            self.executed.add(self.pointer)
            if self.pointer == len(self.input):
                return True, self.accumulator
            self.parse_instruction()
        return False, self.accumulator

    def parse_instruction(self):
        instruction, value = self.input[self.pointer].split(" ")
        value = int(value)
        if instruction == "acc":
            self.accumulator += value
            self.pointer += 1
        elif instruction == "jmp":
            self.pointer += value
        elif instruction == "nop":
            self.pointer += 1

    def reset(self):
        self.accumulator = 0
        self.pointer = 0
        self.executed = set()

    def fix(self):
        for i in range(len(self.input)):
            self.reset()
            instruction, value = self.input[i].split(" ")
            if instruction == "jmp":
                self.input[i] = "nop " + value
            elif instruction == "nop":
                self.input[i] = "jmp " + value
            terminated, accumulator = self.run()

            if terminated:
                return accumulator
            self.input[i] = instruction + " " + value
            continue
        return "No fix found"


_, part_one = Console(input).run()
print(part_one)
part_two = Console(input).fix()

print(part_two)
