use std::collections::HashMap;

impl Solution {
    // Group equal values: a sub-multiset takes each distinct value v
    // somewhere in 0..cnt[v] copies, so one pass per distinct value
    // applies the bounded-knapsack factor new[x] = sum(dp[x - k*v] for
    // k in 0..cnt[v]): a forward unbounded pass folds dp[x - v] into
    // dp[x], then subtracting dp[x - (cnt+1)*v] removes every choice
    // that used too many copies. Zeros change no sum and multiply every
    // count by cnt[0] + 1; the answer is the range sum
    // dp[l] + ... + dp[r].
    pub fn count_sub_multisets(nums: Vec<i32>, l: i32, r: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let mut counts: HashMap<i32, i64> = HashMap::new();
        for &v in &nums {
            *counts.entry(v).or_insert(0) += 1;
        }
        let r_us = r as usize;
        let mut dp = vec![0i64; r_us + 1];
        dp[0] = 1;
        for (&v, &c) in counts.iter() {
            if v == 0 {
                for x in 0..=r_us {
                    dp[x] = dp[x] * (c + 1) % MOD;
                }
            } else if (v >= 0) && (v as i64) <= (r as i64) {
                let v_us = v as usize;
                for x in v_us..=r_us {
                    dp[x] = (dp[x] + dp[x - v_us]) % MOD;
                }
                let width = ((c + 1) * (v as i64)) as usize;
                for x in (width..=r_us).rev() {
                    dp[x] = (dp[x] - dp[x - width] + MOD) % MOD;
                }
            }
        }
        let mut ans: i64 = 0;
        for x in (l as usize)..=r_us {
            ans += dp[x];
        }
        (ans % MOD) as i32
    }
}
