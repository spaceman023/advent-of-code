input: list[str] = open('./inputs/3', 'r').read().splitlines()


class Point:
    def __init__(self, x: int, y: int, tree: bool):
        self.x = x
        self.y = y
        self.tree = tree


class Map:
    def __init__(self, input: list[str]):
        self.points: list[Point] = []
        for y, line in enumerate(input):
            for x, char in enumerate(line):
                self.points.append(Point(x, y, char == '#'))
        self.width = len(input[0])
        self.height = len(input)

    def get_point(self, x: int, y: int) -> Point:
        for point in self.points:
            if point.x == x and point.y == y:
                return point
        return Point(x, y, False)

    def get_tree_count(self, x_step: int, y_step: int) -> int:
        x = 0
        y = 0
        tree_count = 0
        while y < self.points[-1].y:
            x += x_step
            y += y_step
            if x >= self.width:
                x -= self.width
            if self.get_point(x, y).tree:
                tree_count += 1
        return tree_count


# Part 1
map = Map(input)
print(map.get_tree_count(3, 1))

# Part 2
slopes = [(1, 1), (3, 1), (5, 1), (7, 1), (1, 2)]
total = 1
for slope in slopes:
    total *= map.get_tree_count(slope[0], slope[1])
print(total)
