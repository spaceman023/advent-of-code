input = open("./inputs/16", "r").read().split("\n\n")
ranges = input[0].split("\n")
ticket = input[1]
nnearby = input[2].replace("nearby tickets:\n", "")


idx = {}
for r in ranges:
    kind, nums = r.split(": ")
    nums = nums.split(" or ")
    for k in nums:
        start, end = k.split("-")
        for n in range(int(start), int(end)+1):
            idx[n] = kind

error_rate = 0

bad = {}
nnearby = [int(x) for x in nnearby.replace("\n", ",")[:-1].split(",")]
for n in nnearby:
    if n not in idx:
        bad[n] = True
        error_rate += n

print(error_rate)
