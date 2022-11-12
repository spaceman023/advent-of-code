input = open("./inputs/9", "r").read().splitlines()


class Xmas_Breaker:
    def __init__(self, input: list[str], preamble: int):
        input = list(map(lambda x: int(x), input))
        self.full = input
        self.input = input[preamble:]
        self.preamble = preamble
        self.pointer = preamble
        self.invalid_number = 0

    def check_number(self) -> bool:
        for i in range(self.pointer - self.preamble, self.pointer):
            for j in range(i + 1, self.pointer):
                if self.input[i] + self.input[j] == self.input[self.pointer]:
                    return True
        return False

    def find_invalid_number(self) -> int:
        while self.check_number():
            self.pointer += 1
        self.invalid_number = self.input[self.pointer]
        return self.invalid_number

    def find_weakness(self) -> int:
        invalid = self.find_invalid_number()
        for i in range(len(self.full)):
            test = self.full[i]
            for j in range(i+1, len(self.full)):
                test += self.full[j]
                if test == invalid:
                    return min(self.full[i:j+1]) + max(self.full[i:j+1])
                elif test > invalid:
                    continue


part_one = Xmas_Breaker(input, 25).find_invalid_number()
print(part_one)

part_two = Xmas_Breaker(input, 25).find_weakness()
print(part_two)
