use regex::Regex;
use std::cmp;
use std::collections::HashMap;
fn main() {
    let input: &str = include_str!("input.txt");
    let commands = input.lines().map(|x| {
        let c: String;
        if x.contains("toggle") {
            c = String::from("toggle");
        } else if x.contains("on") {
            c = String::from("on");
        } else {
            c = String::from("off");
        }
        let re = Regex::new(r"(\d+),(\d+).through.(\d+),(\d+)").unwrap();
        let caps = re.captures(x).unwrap();
        let r: Vec<i32> = vec![caps.get(1), caps.get(2), caps.get(3), caps.get(4)]
            .iter()
            .map(|y| y.unwrap().as_str().parse().unwrap())
            .collect();
        Com {
            command: c,
            range: r,
        }
    });

    let mut grid: HashMap<String, i32> = HashMap::new();
    for x in 0..1000 {
        for y in 0..1000 {
            let coord = format!("{},{}", x, y);
            grid.insert(coord, 0);
        }
    }
    for z in commands {
        for x in z.range[0]..=z.range[2] {
            for y in z.range[1]..=z.range[3] {
                let coord = format!("{},{}", x, y);
                let ent = &grid.get(&coord).unwrap().clone();
                let com = z.command.as_str();
                if com == "toggle" {
                    grid.insert(coord, ent + 2);
                } else if com == "on" {
                    grid.insert(coord, ent + 1);
                } else {
                    grid.insert(coord, cmp::max(ent - 1, 0));
                }
            }
        }
    }

    let mut count = 0;
    for (_, v) in grid.iter() {
        count += v
    }
    println!("{}", count)
}
struct Com {
    command: String,
    range: Vec<i32>,
}
