
import os.path
INPUT_TXT = os.path.join(os.path.dirname(__file__), 'input02.txt')


def compute_p1(s: str) -> int:
    # split lines on double newline
    games = s.splitlines()
    rules = {
        "A": {
            "X": 3,
            "Y": 6,
            "Z": 0,
        },
        "B": {
            "X": 0,
            "Y": 3,
            "Z": 6,
        },
        "C": {
            "X": 6,
            "Y": 0,
            "Z": 3,
        },
    }
    points = {
        "X": 1,
        "Y": 2,
        "Z": 3,
    }
    p1_score = 0
    for g in games:
        game = g.split(" ")
        a = game[1]
        b = game[0]
        added_points = rules[b][a] + points[a]
        print(added_points)
        p1_score += added_points

    p2_score = 0
    for g in games:
        game = g.split(" ")
        a = game[1]
        b = game[0]
        toplay = ""
        if a == "X":
            toplay = [x for x in rules[b] if rules[b][x] == 0][0]
        elif a == "Y":
            toplay = [x for x in rules[b] if rules[b][x] == 3][0]
        elif a == "Z":
            toplay = [x for x in rules[b] if rules[b][x] == 6][0]
        added_points = rules[b][toplay] + points[toplay]

        print(added_points)
        p2_score += added_points
    return p1_score, p2_score


def main() -> None:
    with open(INPUT_TXT) as f:
        s = f.read()
    print(compute_p1(s))


main()
