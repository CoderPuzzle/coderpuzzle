use std::collections::HashMap;

impl Solution {
    pub fn count_pairs(nums: Vec<i32>, k: i32) -> i64 {
        fn gcd(a: i64, b: i64) -> i64 {
            if b == 0 {
                a
            } else {
                gcd(b, a % b)
            }
        }

        let k = k as i64;
        // Bucket by g = gcd(num, k): the gcd strips every factor of num
        // irrelevant to divisibility by k, and num_i * num_j is divisible
        // by k exactly when (gi * gj) % k == 0. Each g divides k, so there
        // are at most d(k) groups.
        let mut counts: HashMap<i64, i64> = HashMap::new();
        for &num in &nums {
            *counts.entry(gcd(num as i64, k)).or_insert(0) += 1;
        }

        let mut total = 0i64;
        let gs: Vec<i64> = counts.keys().copied().collect();
        // Pair every two groups (a group with itself included).
        for i in 0..gs.len() {
            for j in i..gs.len() {
                if gs[i] * gs[j] % k != 0 {
                    continue;
                }
                if i == j {
                    // Index pairs i < j inside one group: C(c, 2).
                    let c = counts[&gs[i]];
                    total += c * (c - 1) / 2;
                } else {
                    total += counts[&gs[i]] * counts[&gs[j]];
                }
            }
        }
        total
    }
}
