use std::collections::HashMap;
struct Coord {
    x: i32,
    y: i32,
}
impl Coord {
    fn movement(&mut self, arrow: char) -> String {
        match arrow {
            '<' => self.x = self.x - 1,
            '>' => self.x = self.x + 1,
            'v' => self.y = self.y - 1,
            '^' => self.y = self.y + 1,
            _ => println!("Unknown character"),
        };
        return format!("{},{}", self.x, self.y);
    }
}

fn main() {
    let mut houses: HashMap<String, u32> = HashMap::new();
    let input = include_str!("input.txt");
    let (mut santa, mut bot) = (Coord { x: 0, y: 0 }, Coord { x: 0, y: 0 });
    for (i, x) in input.chars().enumerate() {
        let key = if i % 2 == 0 {
            santa.movement(x)
        } else {
            bot.movement(x)
        };
        let e = houses.entry(key).or_insert(0);
        *e += 1;
    }
    println!("{}", houses.len())
}
