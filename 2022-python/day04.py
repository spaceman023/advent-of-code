import os.path
INPUT_TXT = os.path.join(os.path.dirname(__file__), 'input04.txt')


def compute(s: str) -> int:
    lines = s.splitlines()
    n = 0
    # p1
    for line in lines:
        r1, r2 = line.split(",")
        r1 = [int(x) for x in r1.split("-")]
        r2 = [int(x) for x in r2.split("-")]
        if (r1[0] <= r2[0] and r1[1] >= r2[1]) or (r1[0] >= r2[0] and r1[1] <= r2[1]):
            n += 1
    # p2
    m = 0
    for line in lines:
        r1, r2 = line.split(",")
        r1 = [int(x) for x in r1.split("-")]
        r2 = [int(x) for x in r2.split("-")]
        sortedrs = sorted([r1, r2], key=lambda x: x[0])
        # check if lists in sortedrs overlap
        if sortedrs[0][1] >= sortedrs[1][0]:
            m += 1

    return n, m


def main() -> None:
    with open(INPUT_TXT) as f:
        s = f.read()
    print(compute(s))


main()
