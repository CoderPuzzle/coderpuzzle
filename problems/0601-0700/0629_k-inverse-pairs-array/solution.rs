impl Solution {
    pub fn k_inverse_pairs(n: i32, k: i32) -> i32 {
        // dp[j] counts the arrangements of the numbers placed so far that
        // have exactly j inverse pairs; inserting the new maximum m into
        // any of its m slots adds between 0 and m-1 pairs, so row m at j
        // is the sliding-window sum of row m-1 over [j-m+1, j]. `window`
        // is i64: before its reduction it can reach 3 * MOD, past 32-bit
        // range.
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;
        let k = k as usize;
        let mut dp = vec![0i64; k + 1];
        let mut next = vec![0i64; k + 1];
        dp[0] = 1;
        for m in 2..=n {
            let mut window: i64 = 0;
            for j in 0..=k {
                window += dp[j];
                if j >= m {
                    window += MOD - dp[j - m];
                }
                window %= MOD;
                next[j] = window;
            }
            std::mem::swap(&mut dp, &mut next);
        }
        dp[k] as i32
    }
}
