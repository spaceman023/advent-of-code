input = [int(x) for x in open("./inputs/15", "r").read().split(",")]
mem = {}
turn = 1
for i in input:
    if i not in mem:
        mem[i] = turn
    turn += 1

curr = 0

while turn < 30000000:
    if curr not in mem:
        mem[curr] = turn
        curr = 0
    else:
        prev = curr
        curr = turn - mem[prev]
        mem[prev] = turn
    turn += 1

print(curr)
