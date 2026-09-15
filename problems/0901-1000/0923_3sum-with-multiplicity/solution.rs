use std::collections::HashMap;

impl Solution {
    pub fn three_sum_multi(arr: Vec<i32>, target: i32) -> i32 {
        // Count occurrences of each value, then enumerate value pairs
        // (a, b) with a <= b; the required third value c = target - a - b
        // is accepted only when c >= b, so each unordered value multiset
        // {a, b, c} is priced exactly once. The index count is C(ca, 3)
        // when a == b == c, C(ca, 2) * cc or ca * C(cb, 2) when exactly
        // two coincide, and ca * cb * cc when all three differ — each
        // term reduced mod 10^9 + 7 as it is added, since C(3000, 3) is
        // far past 32 bits before the modulus ever fires.
        const MOD: i64 = 1_000_000_007;
        let mut counts: HashMap<i32, i64> = HashMap::new();
        for &value in &arr {
            *counts.entry(value).or_insert(0) += 1;
        }
        let mut values: Vec<i32> = counts.keys().copied().collect();
        values.sort_unstable();
        let d = values.len();
        let mut total: i64 = 0;
        for i in 0..d {
            let a = values[i];
            let ca = counts[&a];
            for j in i..d {
                let b = values[j];
                let c = target - a - b;
                if c < b {
                    break;
                }
                let cc = match counts.get(&c) {
                    Some(&count) => count,
                    None => continue,
                };
                let cb = counts[&b];
                let term = if a == b && b == c {
                    ca * (ca - 1) * (ca - 2) / 6
                } else if a == b {
                    ca * (ca - 1) / 2 * cc
                } else if b == c {
                    ca * cb * (cb - 1) / 2
                } else {
                    ca * cb * cc
                };
                total = (total + term) % MOD;
            }
        }
        total as i32
    }
}
