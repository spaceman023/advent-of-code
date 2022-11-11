input = open("./inputs/6", "r").read().split("\n\n")
input[-1] = input[-1][:-1]


class Group:
    def __init__(self, input):
        self.answers = input.split("\n")
        self.unique_answers = set("".join(self.answers))
        self.all_answers = set(self.unique_answers)
        for answer in self.answers:
            self.all_answers = self.all_answers.intersection(set(answer))

    def count_unique_answers(self):
        return len(self.unique_answers)

    def count_all_answers(self):
        return len(self.all_answers)


class GroupSum:
    def __init__(self, groups):
        self.groups = groups

    def sum_unique_answers(self):
        return sum([group.count_unique_answers() for group in self.groups])

    def sum_all_answers(self):
        return sum([group.count_all_answers() for group in self.groups])


groups = [Group(group) for group in input]
group_sum = GroupSum(groups)
print(group_sum.sum_unique_answers())
print(group_sum.sum_all_answers())
