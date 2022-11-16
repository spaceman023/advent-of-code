input = open("./inputs/13", "r").read().splitlines()
t1 = int(input[0])
buses = [int(b) for b in input[1].split(",") if b != "x"]
soonest = min([(b - t1 % b, b) for b in buses])
print(soonest[0] * soonest[1])

soonest2 = 0
step = 1

for i, b in enumerate(input[1].split(",")):
    if b == "x":
        continue
    b = int(b)
    while (soonest2 + i) % b != 0:
        soonest2 += step
    step *= b
print(soonest2)
