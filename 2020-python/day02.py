input = open('./inputs/2', 'r').read().split('\n')
input.pop()


class Password:
    def __init__(self, inputString: str):
        inputString = inputString.split(': ')
        self.password: str = inputString[1]
        self.policy: str = inputString[0].split(' ')
        self.letter: str = self.policy[1]
        self.min: int = int(self.policy[0].split('-')[0])
        self.max: int = int(self.policy[0].split('-')[1])

    def isValid(self) -> bool:
        return self.min <= self.password.count(self.letter) <= self.max

    def isValid2(self) -> bool:
        return (self.password[self.min-1] == self.letter) != (self.password[self.max-1] == self.letter)


# part one
count1 = 0
for i in range(len(input)):
    input[i] = Password(input[i])
    if input[i].isValid():
        count1 += 1
print(count1)

# part two
count2 = 0
for i in range(len(input)):
    if input[i].isValid2():
        count2 += 1
print(count2)
