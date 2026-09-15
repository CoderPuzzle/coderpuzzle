impl Solution {
    pub fn beautiful_partitions(s: String, k: i32, minLength: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let s = s.as_bytes();
        let n = s.len();
        let k = k as usize;
        let min_len = minLength as usize;
        let is_p = |c: u8| c == b'2' || c == b'3' || c == b'5' || c == b'7';
        // dp[i][j] = number of ways to partition s[0:i] into j beautiful substrings
        let mut dp = vec![vec![0i64; k + 1]; n + 1];
        dp[0][0] = 1;
        for j in 1..=k {
            let mut prefix = vec![0i64; n + 1];
            for x in 0..n {
                prefix[x + 1] = prefix[x];
                if is_p(s[x]) {
                    prefix[x + 1] += dp[x][j - 1];
                }
            }
            for i in 1..=n {
                if is_p(s[i - 1]) {
                    continue;
                }
                if i >= min_len {
                    dp[i][j] = prefix[i - min_len + 1] % MOD;
                }
            }
        }
        (dp[n][k] % MOD) as i32
    }
}
