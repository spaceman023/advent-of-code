import os.path
INPUT_TXT = os.path.join(os.path.dirname(__file__), 'input01.txt')


def compute(s: str) -> int:
    # split lines on double newline
    groups = s.split('\n\n')
    sums = []
    for g in groups:
        group = g.splitlines()
        gints = [int(x) for x in group]
        sums.append(sum(gints))

    # sort sums and return top three
    sums.sort(reverse=True)
    return sums[0] + sums[1] + sums[2]
    # sum each group


def main() -> None:
    with open(INPUT_TXT) as f:
        s = f.read()
    print(compute(s))


main()
