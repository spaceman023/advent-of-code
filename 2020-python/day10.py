input = sorted([int(x) for x in open("./inputs/10", "r").read().splitlines()])
input = [0] + input + [max(input)+3]
three_jolts = 0
one_jolt = 0
for x in range(len(input)-1):
    curr = input[x]
    nex = input[x+1]
    print(nex - curr)
    if nex - curr == 1:
        one_jolt += 1
    elif nex - curr == 3:
        three_jolts += 1

print(three_jolts, one_jolt)
print(one_jolt * three_jolts)

paths = [1]
for x in range(1, len(input)):
    curr = input[x]
    ways = 0
    for y in range(max(0, x-3), x):
        if curr - input[y] < 4:
            ways += paths[y]
    paths.append(ways)
print(paths[-1])
