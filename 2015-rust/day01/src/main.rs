use std::fs;
fn main() {
    let filename = "input.txt";
    let contents: String =
        fs::read_to_string(filename).expect("Something went wrong reading the file");
    let mut count = 0;
    let mut kp = true;
    for (i, x) in contents.chars().enumerate() {
        if count < 0 && kp {
            println!("{}", i);
            kp = false;
        }
        if x == '(' {
            count = count + 1;
            continue;
        }
        if x == ')' {
            count = count - 1;
            continue;
        }
    }
    println!("{}", count)
}
