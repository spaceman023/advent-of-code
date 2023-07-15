f = open('./inputs/8', 'r')
lines = f.readlines()
f.close()

# Part 1
def createMap():
    map = {}
    for x in range(0, 50):
        for y in range(0, 6):
            map[(x,y)] = 0
    return map

def printMap(map):
    for y in range(0, 6):
        for x in range(0, 50):
            if map[(x,y)] == 1:
                print('#', end='')
            else:
                print('.', end='')
        print('')

def rect(map, x, y):
    for i in range(0, x):
        for j in range(0, y):
            map[(i,j)] = 1

def rotateRow(map, y, n):
    for i in range(0, n):
        last = map[(49,y)]
        for x in range(49, 0, -1):
            map[(x,y)] = map[(x-1,y)]
        map[(0,y)] = last

def rotateColumn(map, x, n):
    for i in range(0, n):
        last = map[(x,5)]
        for y in range(5, 0, -1):
            map[(x,y)] = map[(x,y-1)]
        map[(x,0)] = last

def countPixels(map):
    count = 0
    for x in range(0, 50):
        for y in range(0, 6):
            if map[(x,y)] == 1:
                count += 1
    return count

map = createMap()
for line in lines:
    if line.startswith('rect'):
        rect(map, int(line.split(' ')[1].split('x')[0]), int(line.split(' ')[1].split('x')[1]))
    elif line.startswith('rotate row'):
        rotateRow(map, int(line.split(' ')[2].split('=')[1]), int(line.split(' ')[4]))
    elif line.startswith('rotate column'):
        rotateColumn(map, int(line.split(' ')[2].split('=')[1]), int(line.split(' ')[4]))

print(countPixels(map))

# Part 2
printMap(map)

