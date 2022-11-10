input = open('./inputs/5', 'r').read().splitlines()


class BoardingPass:
    def __init__(self, bin: str):
        self.bin = bin

    def get_seat(self) -> tuple[int, int]:
        row = int(self.bin[:7].replace('F', '0').replace('B', '1'), 2)
        column = int(self.bin[7:].replace('L', '0').replace('R', '1'), 2)
        return row, column

    def get_id(self) -> int:
        row, column = self.get_seat()
        return row * 8 + column


class Scanner:
    def __init__(self, input: list[str]):
        self.passes = []
        for line in input:
            self.passes.append(BoardingPass(line))

    def get_max(self) -> int:
        max_id = 0
        for boarding_pass in self.passes:
            max_id = max(max_id, boarding_pass.get_id())
        return max_id

    def get_missing(self) -> int:
        ids = []
        for boarding_pass in self.passes:
            ids.append(boarding_pass.get_id())
        ids.sort()
        for i in range(len(ids) - 1):
            if ids[i] + 1 != ids[i + 1]:
                return ids[i] + 1


print(Scanner(input).get_max())
print(Scanner(input).get_missing())
