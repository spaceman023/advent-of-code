input = open('./inputs/7', 'r').read().splitlines()
input.pop()


class Bag:
    def __init__(self, line):
        self.name = line.split(' bags contain ')[0]
        self.content = {}
        for bag in line.split(' bags contain ')[1].split(', '):
            if bag == 'no other bags.':
                continue
            self.content[bag[2:].split(' bag')[0]] = int(bag[0])

    def get_contents(self) -> dict:
        return self.content


class Bags:
    def __init__(self, input):
        self.bags = {}
        for line in input:
            bag = Bag(line)
            self.bags[bag.name] = bag.get_contents()

    def get_bag(self, bag: str) -> Bag:
        return self.bags[bag]

    def get_bag_count(self, bag: str) -> int:
        count = 0
        for k, v in self.get_bag(bag).items():
            count += 1
            count += self.get_bag_count(k)
        return count


# Part 1
p1bags = Bags(input)
p1count = Bags.get_bag_count(p1bags, 'shiny gold')
print(p1count)
