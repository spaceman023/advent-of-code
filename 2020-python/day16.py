import math
input = open("./inputs/16", "r").read().split("\n\n")


class Field:
    def __init__(self, line):
        name, ranges = line.split(": ")
        ranges = [tuple(map(int, x.split("-"))) for x in ranges.split(" or ")]
        self.name = name
        self.ranges = ranges

    def __contains__(self, x):
        return any(a <= x <= b for a, b in self.ranges)

    def __repr__(self):
        return self.name


class Ticket:
    def __init__(self, line):
        self.values = [int(x) for x in line.split(",")]

    def __iter__(self):
        return iter(self.values)

    def __len__(self):
        return len(self.values)

    def __repr__(self) -> str:
        return str(self.values)

    def is_valid(self, fields):
        return all(any(x in f for f in fields) for x in self.values)


def parse_input(input):
    fields = [Field(line) for line in input[0].split("\n")]
    my_ticket = Ticket(input[1].split("\n")[1])
    nearby_tickets = [Ticket(line) for line in input[2].split("\n")[1:-1]]
    return fields, my_ticket, nearby_tickets


def part1(input):
    fields, _, nearby_tickets = parse_input(input)
    return sum(x for t in nearby_tickets for x in t if not any(x in f for f in fields))


def part2(input):
    fields, my_ticket, nearby_tickets = parse_input(input)
    valid_tickets = [t for t in nearby_tickets if t.is_valid(fields)]
    field_order = {}
    while len(field_order) < len(fields):
        for i in range(len(fields)):
            if i in field_order:
                continue
            possible_fields = [f for f in fields if all(
                t.values[i] in f for t in valid_tickets) and f not in field_order.values()]
            if len(possible_fields) == 1:
                field_order[i] = possible_fields[0]
    return math.prod(t for i, t in enumerate(my_ticket) if field_order[i].name.startswith("departure"))


print(part1(input))
print(part2(input))
