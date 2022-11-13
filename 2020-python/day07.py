import re
input = open("./inputs/7", "r").read().splitlines()

bags = {}
regex = re.compile(r"(\d+) (\w+ \w+) bags?")
for line in input:
    bag, content = line.split(" bags contain ")
    bags[bag] = {}
    for match in regex.finditer(content):
        bags[bag][match.group(2)] = int(match.group(1))


print(bags)


def count_bags1(bag):
    q = [bag]
    for bag in q:
        for b in bags:
            if bag in bags[b]:
                q.append(b)
    return len(set(q)) - 1


def count_bags2(bag):
    return sum([bags[bag][b] * (1 + count_bags2(b)) for b in bags[bag]])


print(count_bags1("shiny gold"))
print(count_bags2("shiny gold"))
