use std::collections::HashMap;

impl Solution {
    pub fn fixed_ratio(s: String, num1: i32, num2: i32) -> i64 {
        // A substring's zeros z and ones o have ratio num1 : num2 exactly
        // when z*num2 == o*num1. With prefix counts Z, O, the substring
        // (l, r) qualifies exactly when Z[r]*num2 - O[r]*num1 equals
        // Z[l]*num2 - O[l]*num1, so counting pairs of equal prefix keys is
        // the whole task. The key reaches 10^5*10^5 = 10^10, so it is
        // stored as an i64.
        let mut seen = HashMap::new();
        seen.insert(0i64, 1i64);
        let (mut z, mut o) = (0i64, 0i64);
        let mut ans: i64 = 0;
        for &b in s.as_bytes() {
            if b == b'0' {
                z += 1;
            } else {
                o += 1;
            }
            let key = z * num2 as i64 - o * num1 as i64;
            let prev = seen.entry(key).or_insert(0);
            ans += *prev;
            *prev += 1;
        }
        ans
    }
}
