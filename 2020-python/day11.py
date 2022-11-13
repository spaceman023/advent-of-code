import copy
input: list[str] = open('./inputs/11', 'r').read().splitlines()

class Floorplan:
    def __init__(self, input: list[str]) -> None:
        self.plan = {}
        self.parse(input)

    def parse(self, input):
        for row in range(len(input)):
            for col in range(len(input[row])):
                self.plan[(row, col)] = input[row][col]

    def count(self, seat: tuple[int, int]) -> tuple[int, int]:
        relative_positions = [[-1, -1], [-1, 0], [-1, 1],
                              [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
        adjacent = 0
        for r in relative_positions:
            pkey = (seat[0] + r[0], seat[1] + r[1])
            if pkey in self.plan and self.plan[pkey] == "#":
                adjacent += 1
        visible = 0
        for r in relative_positions:
            checked = False
            distance = 1
            while not checked:
                pkey = (seat[0] + r[0] * distance, seat[1] + r[1] * distance)
                if pkey not in self.plan:
                    checked = True
                elif pkey in self.plan and self.plan[pkey] == "#":
                    checked = True
                    visible += 1
                elif pkey in self.plan and self.plan[pkey] == "L":
                    checked = True
                distance += 1

        return (adjacent, visible)

    def simulate(self) -> int:
        changes = True
        while changes:
            changes = False
            new_plan = copy.deepcopy(self.plan)
            for seat, status in self.plan.items():
                count = self.count(seat)[0]
                if status == "L" and count == 0:
                    new_plan[seat] = "#"
                    changes = True
                elif status == "#" and count > 3:
                    new_plan[seat] = "L"
                    changes = True
                else:
                    new_plan[seat] = status
            self.plan = new_plan
        return len([x for x in self.plan.values() if x == "#"])

    def simulate2(self) -> int:
        changes = True
        while changes:
            changes = False
            new_plan = copy.deepcopy(self.plan)
            for seat, status in self.plan.items():
                count = self.count(seat)[1]
                if status == "L" and count == 0:
                    new_plan[seat] = "#"
                    changes = True
                elif status == "#" and count > 4:
                    new_plan[seat] = "L"
                    changes = True
                else:
                    new_plan[seat] = status
            self.plan = new_plan
        return len([x for x in self.plan.values() if x == "#"])


# part 1
print(Floorplan(input).simulate())
# part 2
print(Floorplan(input).simulate2())
