use std::collections::HashMap;

impl Solution {
    pub fn min_cost(nums: Vec<i32>, k: i32) -> i64 {
        // dp[r] = min cost to split the first r elements. For each r,
        // sweep l downward from r-1 while extending one frequency
        // table: a value seen for the first time adds nothing, its
        // second occurrence adds 2 to the trimmed length (the missed
        // first occurrence plus this one), later ones add 1 each.
        // Costs reach n*(k+n) ~ 10^12, past i32 range — i64 throughout.
        let n = nums.len();
        let mut dp = vec![i64::MAX; n + 1];
        dp[0] = 0;
        for r in 1..=n {
            let mut freq: HashMap<i32, i64> = HashMap::new();
            let mut trimmed: i64 = 0;
            let mut best = i64::MAX;
            for l in (0..r).rev() {
                let count = freq.entry(nums[l]).and_modify(|c| *c += 1).or_insert(1);
                if *count == 2 {
                    trimmed += 2;
                } else if *count > 2 {
                    trimmed += 1;
                }
                best = best.min(dp[l] + k as i64 + trimmed);
            }
            dp[r] = best;
        }
        dp[n]
    }
}
