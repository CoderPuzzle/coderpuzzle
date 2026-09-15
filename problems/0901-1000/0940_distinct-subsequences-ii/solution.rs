impl Solution {
    pub fn distinct_subseq_ii(s: String) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let s = s.as_bytes();
        let n = s.len();
        let mut dp = vec![0i64; n + 1];
        // dp[i]: distinct subsequences of the first i chars, empty included.
        dp[0] = 1;
        let mut last = [-1i64; 26];
        for i in 1..=n {
            let c = (s[i - 1] - b'a') as usize;
            // Appending c nominally doubles the count...
            dp[i] = dp[i - 1] * 2 % MOD;
            if last[c] >= 0 {
                // ...but on a repeat, subtract the strings already produced
                // when c was last appended: dp of the prefix before it.
                dp[i] = (dp[i] - dp[last[c] as usize] + MOD) % MOD;
            }
            last[c] = (i - 1) as i64;
        }
        // Drop the empty subsequence (+MOD repairs the wrapped subtraction).
        ((dp[n] - 1 + MOD) % MOD) as i32
    }
}
