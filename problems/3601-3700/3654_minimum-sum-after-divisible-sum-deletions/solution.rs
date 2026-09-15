use std::collections::HashMap;

impl Solution {
    pub fn min_array_sum(nums: Vec<i32>, k: i32) -> i64 {
        // A block sums to a multiple of k exactly when its endpoint prefix
        // sums share a remainder mod k, and any deletion sequence collapses
        // to disjoint divisible-sum blocks of the original array.
        let k = k as i64;
        let mut best: HashMap<i64, i64> = HashMap::new();
        best.insert(0, 0);
        // dp: min surviving sum over the elements processed so far. Totals
        // reach 1e11, hence i64 throughout.
        let (mut dp, mut prefix) = (0i64, 0i64);
        for &value in &nums {
            // Keep this element...
            let mut cand = dp + value as i64;
            prefix += value as i64;
            // ...or delete back to the nearest same-remainder prefix, which
            // leaves that prefix's surviving sum untouched.
            let r = prefix % k;
            if let Some(&seen) = best.get(&r) {
                if seen < cand {
                    cand = seen;
                }
            }
            dp = cand;
            // Insert after the lookup so the empty block never registers.
            let slot = best.entry(r).or_insert(dp);
            if dp < *slot {
                *slot = dp;
            }
        }
        dp
    }
}
