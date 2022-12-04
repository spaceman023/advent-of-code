import os.path
INPUT_TXT = os.path.join(os.path.dirname(__file__), 'input03.txt')


def compute(s: str) -> int:
    sacks = s.splitlines()
    priorities_p1 = []
    p1 = 0
    alphabet = list('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
    for sack in sacks:
        first_ruck = set(sack[0:(len(sack)//2)])
        second_ruck = set(sack[((len(sack))//2):len(sack)])
        priority = set.intersection(first_ruck, second_ruck)
        priorities_p1 += list(priority)

    p2 = 0
    priorities_p2 = []
    for n in range(0, len(sacks), 3):
        rucks = []
        for ruck in range(n, n+3):
            rucks.append(set(sacks[ruck]))
        print(rucks)
        start = rucks[0]
        for r in rucks:
            start = set.intersection(start, r)
        print(start)
        priorities_p2 += list(start)

    for p in priorities_p1:
        p1 += alphabet.index(p)+1
    for p in priorities_p2:
        p2 += alphabet.index(p)+1

    return p1, p2


def main() -> None:
    with open(INPUT_TXT) as f:
        s = f.read()
    print(compute(s))


main()
