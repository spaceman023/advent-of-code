input = open('./inputs/4', 'r').read().split('\n\n')


class Passport:
    def __init__(self, input: str):
        input = input.replace('\n', ' ')
        self.fields = {}
        for field in input.split():
            key, value = field.split(':')
            self.fields[key] = value

    def is_valid1(self) -> bool:
        return len(self.fields) == 8 or (len(self.fields) == 7 and 'cid' not in self.fields)

    def is_valid2(self) -> bool:
        if not self.is_valid1():
            return False
        if not 1920 <= int(self.fields['byr']) <= 2002:
            return False
        if not 2010 <= int(self.fields['iyr']) <= 2020:
            return False
        if not 2020 <= int(self.fields['eyr']) <= 2030:
            return False
        if self.fields['hgt'][-2:] == 'cm':
            if not 150 <= int(self.fields['hgt'][:-2]) <= 193:
                return False
        elif self.fields['hgt'][-2:] == 'in':
            if not 59 <= int(self.fields['hgt'][:-2]) <= 76:
                return False
        else:
            return False
        if not self.fields['hcl'][0] == '#' or len(self.fields['hcl']) != 7:
            return False
        for char in self.fields['hcl'][1:]:
            if not (char.isdigit() or char in 'abcdef'):
                return False
        if self.fields['ecl'] not in ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth']:
            return False
        if len(self.fields['pid']) != 9:
            return False
        for char in self.fields['pid']:
            if not char.isdigit():
                return False
        return True


class PassportChecker:
    def __init__(self, input: list[str]):
        self.passports = []
        for line in input:
            self.passports.append(Passport(line))

    def get_valid_count1(self) -> int:
        valid_count = 0
        for passport in self.passports:
            if passport.is_valid1():
                valid_count += 1
        return valid_count

    def get_valid_count2(self) -> int:
        valid_count = 0
        for passport in self.passports:
            if passport.is_valid2():
                valid_count += 1
        return valid_count


# part 1
checker = PassportChecker(input)
print(checker.get_valid_count1())

# part 2
print(checker.get_valid_count2())
