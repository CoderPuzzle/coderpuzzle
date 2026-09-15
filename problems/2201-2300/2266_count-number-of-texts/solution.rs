impl Solution {
    pub fn count_texts(pressed_keys: String) -> i64 {
        const MOD: i64 = 1_000_000_007;
        let bytes = pressed_keys.as_bytes();
        let n = bytes.len();
        let mut dp = vec![0i64; n + 1];
        dp[0] = 1;
        let mut i = 0;
        while i < n {
            let ch = bytes[i];
            let max_press = if ch == b'7' || ch == b'9' { 4 } else { 3 };
            let mut j = i;
            while j < n && bytes[j] == ch {
                j += 1;
            }
            for p in i..j {
                let mut total: i64 = 0;
                let mut q = p as i64;
                while q >= i as i64 && (p as i64 - q) < max_press {
                    total = (total + dp[q as usize]) % MOD;
                    q -= 1;
                }
                dp[p + 1] = total;
            }
            i = j;
        }
        dp[n]
    }
}
