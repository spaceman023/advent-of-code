fn main() {
    let paper: u32 = include_str!("input.txt")
        .split("\n")
        .filter(|x| x.len() > 0)
        .map(|x| x.split("x").map(|y| y.parse::<u32>().unwrap()).collect())
        .map(|x: Vec<u32>| {
            let lw = 2 * x[0] * x[1];
            let wh = 2 * x[1] * x[2];
            let hl = 2 * x[2] * x[0];
            let slack = vec![lw, wh, hl].iter().min().unwrap() / 2;
            lw + wh + hl + slack
        })
        .fold(0, |a, b| a + b);
    println!("{:?}", paper);

    let ribbon: u32 = include_str!("input.txt")
        .split("\n")
        .filter(|x| x.len() > 0)
        .map(|x| x.split("x").map(|y| y.parse::<u32>().unwrap()).collect())
        .map(|mut x: Vec<u32>| {
            x.sort();
            let a = x[0];
            let b = x[1];
            let wrap = 2 * a + 2 * b;
            let bow = x[0] * x[1] * x[2];
            bow + wrap
        })
        .fold(0, |a, b| a + b);
    println!("{:?}", ribbon)
}
