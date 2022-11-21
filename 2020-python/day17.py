import copy
input = open("./inputs/17", "r").read().split("\n")


class Dimension:
    def __init__(self, input):
        self.cubes = {}
        for y, line in enumerate(input):
            for x, state in enumerate(line):
                self.cubes[(x, y, 0, 0)] = state

    def get_neighbors(self, cube: tuple[int, int, int]) -> list[str]:
        neighbors = []
        for x in range(cube[0] - 1, cube[0] + 2):
            for y in range(cube[1] - 1, cube[1] + 2):
                for z in range(cube[2] - 1, cube[2] + 2):
                    for w in range(cube[3] - 1, cube[3] + 2):
                        if (x, y, z, w) != cube and (x, y, z, w) in self.cubes:
                            neighbors.append(self.cubes[(x, y, z, w)])
        return neighbors

    def create_new_cubes(self) -> list[tuple[int, int, int]]:
        to_add = []
        for cube in self.cubes.keys():
            for x in range(cube[0] - 1, cube[0] + 2):
                for y in range(cube[1] - 1, cube[1] + 2):
                    for z in range(cube[2] - 1, cube[2] + 2):
                        for w in range(cube[3] - 1, cube[3] + 2):
                            if (x, y, z, w) != cube and (x, y, z, w) not in self.cubes:
                                to_add.append((x, y, z, w))
        return to_add

    def get_active_neighbors(self, cube):
        return self.get_neighbors(cube).count("#")

    def get_active_cubes(self):
        return list(self.cubes.values()).count("#")

    def __repr__(self):
        return str(self.cubes)

    def cycle(self):
        for cube in self.create_new_cubes():
            self.cubes[cube] = "."
        new_cubes = copy.deepcopy(self.cubes)
        for cube in self.cubes:
            if self.cubes[cube] == "#" and self.get_active_neighbors(cube) not in [2, 3]:
                new_cubes[cube] = "."
            elif self.cubes[cube] == "." and self.get_active_neighbors(cube) == 3:
                new_cubes[cube] = "#"
        self.cubes = new_cubes


dimension = Dimension(input)
for i in range(6):
    dimension.cycle()
print(dimension.get_active_cubes())
