impl Solution {
    pub fn split_into_fibonacci(num: String) -> Vec<i32> {
        // Only the first two pieces of a split are free — every later term
        // is the sum of the two before it — so a candidate split is nothing
        // but a pair of cuts. Try cut pairs shortest piece first (a term
        // fits in 32 bits, so ten digits cap each piece), follow the forced
        // run under each pair, and return the first sequence that consumes
        // the string: exactly the shortest-first split the statement pins.
        const LIMIT: i64 = (1 << 31) - 1;
        let num = num.as_bytes();
        let n = num.len();
        for i in 1..=10.min(n.saturating_sub(2)) {
            if num[0] == b'0' && i > 1 {
                break;
            }
            let a: i64 = num[..i].iter().fold(0, |acc, &c| acc * 10 + (c - b'0') as i64);
            if a > LIMIT {
                break;
            }
            for j in (i + 1)..=(i + 10).min(n - 1) {
                if num[i] == b'0' && j - i > 1 {
                    break;
                }
                let b: i64 = num[i..j].iter().fold(0, |acc, &c| acc * 10 + (c - b'0') as i64);
                if b > LIMIT {
                    break;
                }
                let mut seq = vec![a as i32, b as i32];
                let mut pos = j;
                let (mut x, mut y) = (a, b);
                while pos < n {
                    let z = x + y;
                    if z > LIMIT {
                        break;
                    }
                    let s = z.to_string();
                    if !num[pos..].starts_with(s.as_bytes()) {
                        break;
                    }
                    seq.push(z as i32);
                    pos += s.len();
                    x = y;
                    y = z;
                }
                if pos == n {
                    return seq;
                }
            }
        }
        Vec::new()
    }
}
