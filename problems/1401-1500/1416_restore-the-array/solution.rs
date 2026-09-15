impl Solution {
    pub fn number_of_arrays(s: String, k: i64) -> i64 {
        const MOD: i64 = 1_000_000_007;
        let bytes = s.as_bytes();
        let n = bytes.len();
        let max_len = k.to_string().len();
        let mut dp = vec![0i64; n + 1];
        dp[n] = 1;
        for i in (0..n).rev() {
            if bytes[i] == b'0' {
                continue;
            }
            let mut total: i64 = 0;
            let mut value: i64 = 0;
            let limit = max_len.min(n - i);
            for len in 1..=limit {
                value = value * 10 + (bytes[i + len - 1] - b'0') as i64;
                if value > k {
                    break;
                }
                total = (total + dp[i + len]) % MOD;
            }
            dp[i] = total;
        }
        dp[0]
    }
}
