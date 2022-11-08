input = open('./inputs/1', 'r').read().split('\n')
input.pop()
# part one
for i in range(len(input)):
    for j in range(i, len(input)):
        if int(input[i]) + int(input[j]) == 2020:
            print(int(input[i]) * int(input[j]))

# part two
# optimal 3-sum
input = sorted(list(map(lambda x: int(x), input)))

for i in range(len(input)-2):
    if i > 0 and input[i] == input[i-1]:
        continue
    l = i + 1
    r = len(input) - 1
    while l < r:
        if input[i] + input[l] + input[r] == 2020:
            print(input[i] * input[l] * input[r])
            break
        elif input[i] + input[l] + input[r] < 2020:
            l += 1
        else:
            r -= 1

