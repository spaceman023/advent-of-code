use md5;

fn main() {
    compute_md5(String::from("bgvyzdsv"))
}

fn compute_md5(sk: String) {
    let mut i = 0;
    loop {
        let mut k = sk.clone();
        k.push_str(&i.to_string());
        let j = md5::compute(k);
        if &format!("{:x}", j)[0..6] == "000000" {
            println!("{:x}", j);
            println!("{}", i);
            break;
        }
        i = i + 1;
    }
}
