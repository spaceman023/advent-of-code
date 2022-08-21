use std::collections::HashMap;
fn main() {
    let mut input: Vec<&str> = include_str!("input.txt").lines().collect();
    input.sort();
    let commands: Vec<Vec<&str>> = input.iter().map(|x| x.split(" -> ").collect()).collect();
    let mut signals: HashMap<&str, u16> = HashMap::new();
    let q: Vec<Vec<&str>>;
    q.push(commands[0]);
    while (q.len() > 0) {
        let c = q.pop().unwrap();
        let ex = c[0];
        let params: Vec<&str> = ex.split(" ").collect();
        match params.len() {
            1 => {
                signals.insert(c[1], params[0].parse().unwrap());
                ()
            }
            2 => {
                let val = signals.get(params[1]);
                match val {
                    Some(val) => {
                        let val = !val;
                        signals.insert(c[1], val);
                    }
                    None => {
                        signals.insert(c[1]);
                        ();
                    }
                }

                ()
            }
            3 => {
                let val = signals.get(params[0]).unwrap().clone();
                match params[1] {
                    "AND" => {
                        let comp = signals.get(params[2]).unwrap().clone();
                        signals.insert(c[1], val & comp);
                        ()
                    }
                    "OR" => {
                        let comp = signals.get(params[2]).unwrap().clone();
                        signals.insert(c[1], val | comp);
                        ()
                    }
                    "LSHIFT" => {
                        let comp: u16 = params[2].parse().unwrap();
                        signals.insert(c[1], val << comp);
                        ()
                    }
                    "RSHIFT" => {
                        let comp: u16 = params[2].parse().unwrap();
                        signals.insert(c[1], val >> comp);
                        ()
                    }
                    _ => {
                        println!("Error!")
                    }
                }
            }
            _ => {
                println!("Error!")
            }
        }
    }
}
//note: need to create a recursive function that follows the wires to the point that their value is originally set
