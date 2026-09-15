impl Solution {
    pub fn count_good_strings(low: i32, high: i32, zero: i32, one: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // dp[L] = buildable strings of length L; dp[0] = 1 for the empty
        // string. A string's final block (zeros or ones) fixes its last
        // character, so the two cases are disjoint and exhaustive.
        let mut dp = vec![0i64; high as usize + 1];
        dp[0] = 1;
        for length in 1..=high as usize {
            // Climb-stairs recurrence with step sizes zero and one; the
            // appended letter at each step fixes content, so distinct block
            // sequences are distinct strings.
            let mut ways: i64 = 0;
            if length >= zero as usize {
                ways += dp[length - zero as usize];
            }
            if length >= one as usize {
                ways += dp[length - one as usize];
            }
            dp[length] = ways % MOD;
        }
        // Length is the only acceptance criterion, so sum lengths in range.
        let mut total: i64 = 0;
        for length in low as usize..=high as usize {
            total = (total + dp[length]) % MOD;
        }
        total as i32
    }
}
