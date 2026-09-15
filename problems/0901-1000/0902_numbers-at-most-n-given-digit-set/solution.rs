impl Solution {
    pub fn at_most_n_given_digit_set(digits: Vec<String>, n: i32) -> i32 {
        // Numbers shorter than n are composeable by construction and all
        // fall below n; for n's own length, walk its digits: a set digit
        // strictly below the current one fixes a smaller prefix and frees
        // the remaining positions, while the equal path survives only
        // while n's own digit stays in the set.
        let s = n.to_string();
        let length = s.len();
        let k = digits.len() as i64;
        let mut has = [false; 10];
        for d in &digits {
            has[(d.as_bytes()[0] - b'0') as usize] = true;
        }
        let mut below = [0i64; 10];
        for v in 1..10 {
            below[v] = below[v - 1] + i64::from(has[v - 1]);
        }
        let mut powers = vec![1i64; length + 1];
        for j in 1..=length {
            powers[j] = powers[j - 1] * k;
        }
        let mut total: i64 = powers[1..length].iter().sum();
        let mut alive = true;
        for (i, ch) in s.bytes().enumerate() {
            let v = (ch - b'0') as usize;
            // Set digits below n's digit v leave the tail free.
            total += below[v] * powers[length - 1 - i];
            if !has[v] {
                // The equal path dies here: no prefix of n extends past v.
                alive = false;
                break;
            }
        }
        if alive {
            // Every digit of n is in the set, so n itself counts.
            total += 1;
        }
        total as i32
    }
}
