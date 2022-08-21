use fancy_regex::Regex;
use lazy_static::lazy_static;

fn main() {
    let i: Vec<String> = include_str!("input.txt")
        .split("\n")
        .filter(|x| x.len() > 0)
        .map(|x| String::from(x))
        .collect();
    let mut p1 = PartOneMatcher {
        naughty: 0,
        nice: 0,
        list: i.clone(),
    };
    p1.find_out();
    let mut p2 = PartTwoMatcher {
        naughty: 0,
        nice: 0,
        list: i.clone(),
    };
    p2.find_out();
    println!("Nice: {}, Naughty: {}", p1.nice, p1.naughty);
    println!("Nice: {}, Naughty: {}", p2.nice, p2.naughty);
}

struct PartOneMatcher {
    naughty: i32,
    nice: i32,
    list: Vec<String>,
}

impl PartOneMatcher {
    fn check_vowels(&self, k: &String) -> i32 {
        let mut score = 0;
        for x in k.chars() {
            if "aeiou".contains(x) {
                score += 1;
            }
        }
        return score;
    }
    fn check_double(&self, k: &String) -> bool {
        lazy_static! {
            static ref RE: Regex = Regex::new(r"(.)\1").unwrap();
        }
        RE.is_match(&k).unwrap()
    }
    fn check_banned(&self, k: &String) -> bool {
        for x in vec!["ab", "cd", "pq", "xy"].iter() {
            if k.contains(x) {
                return false;
            }
        }
        true
    }
    fn find_out(&mut self) {
        for x in self.list.iter() {
            if self.check_vowels(x) > 2 && self.check_double(x) && self.check_banned(x) {
                self.nice += 1;
            } else {
                self.naughty += 1;
            }
        }
    }
}

struct PartTwoMatcher {
    naughty: i32,
    nice: i32,
    list: Vec<String>,
}

impl PartTwoMatcher {
    fn check_pair(&self, k: &String) -> bool {
        lazy_static! {
            static ref RE: Regex = Regex::new(r"(\w\w).*\1").unwrap();
        }
        RE.is_match(&k).unwrap()
    }
    fn check_repeat(&self, k: &String) -> bool {
        lazy_static! {
            static ref RE: Regex = Regex::new(r"(\w)\w\1").unwrap();
        }
        RE.is_match(&k).unwrap()
    }
    fn find_out(&mut self) {
        for x in self.list.iter() {
            if self.check_pair(x) && self.check_repeat(x) {
                self.nice += 1;
            } else {
                self.naughty += 1;
            }
        }
    }
}
