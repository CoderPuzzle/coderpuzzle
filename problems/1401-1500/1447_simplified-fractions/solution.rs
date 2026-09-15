impl Solution {
    pub fn simplified_fractions(n: i32) -> Vec<String> {
        let mut result = Vec::new();
        for numer in 1..n {
            for denom in (numer + 1)..=n {
                if gcd(numer, denom) == 1 {
                    result.push(format!("{}/{}", numer, denom));
                }
            }
        }
        result
    }
}

fn gcd(a: i32, b: i32) -> i32 {
    if b == 0 {
        a
    } else {
        gcd(b, a % b)
    }
}
