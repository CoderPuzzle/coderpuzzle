impl Solution {
    pub fn good_binary_strings(min_length: i32, max_length: i32, one_group: i32, zero_group: i32) -> i32 {
        // dp[i] counts good strings of length i: peel off the final run of
        // equal characters — its size is a positive multiple of oneGroup or
        // zeroGroup, and what remains is any shorter good string (or nothing).
        const MOD: i64 = 1_000_000_007;
        let n = max_length as usize;
        let mut dp = vec![0i64; n + 1];
        dp[0] = 1;
        for i in 1..=n {
            let mut v = 0i64;
            if i as i32 >= one_group {
                v += dp[i - one_group as usize];
            }
            if i as i32 >= zero_group {
                v += dp[i - zero_group as usize];
            }
            dp[i] = v % MOD;
        }
        let mut total = 0i64;
        for i in min_length as usize..=n {
            total += dp[i];
        }
        (total % MOD) as i32
    }
}
