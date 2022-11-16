import itertools
input = open("./inputs/14", "r").read().splitlines()


def parse_mask(rawmask):
    return rawmask.split(" = ")[1]


def parse_instruction(rawinstruction: str):
    address, value = rawinstruction.split(" = ")
    value = bin(int(value))[2:].zfill(36)
    address = address.replace("mem[", "").replace("]", "")
    return (address, value)


def mask_transform(mask, value):
    final = ""
    for i in range(len(mask)):
        if mask[i] == "X":
            final += value[i]
        else:
            final += mask[i]
    return final


def address_transform(mask, address):
    final = ""
    for i in range(len(mask)):
        if mask[i] == "0":
            final += address[i]
        elif mask[i] == "1":
            final += "1"
        else:
            final += "X"
    all_addresses = []
    perms = itertools.product([0, 1], repeat=final.count("X"))
    for p in perms:
        out = ""
        pindex = 0
        for b in final:
            if b == "X":
                out += str(p[pindex])
                pindex += 1
            else:
                out += b
        all_addresses.append(int(out, 2))
    return all_addresses


memory = {}

mask = input[0]

for i in input:
    if i[:4] == "mask":
        mask = parse_mask(i)
    else:
        address, value = parse_instruction(i)
        value = mask_transform(mask, value)
        memory[address] = value

p1 = 0
for v in memory.values():
    p1 += int(v, 2)


p2 = 0
memory2 = {}
for i in input:
    if i[:4] == "mask":
        mask = parse_mask(i)
    else:
        address, value = parse_instruction(i)
        address = bin(int(address))[2:].zfill(36)
        addresses = address_transform(mask, address)
        for a in addresses:
            memory2[a] = value

for v in memory2.values():
    p2 += int(v, 2)

print(p1)
print(p2)
