impl Solution {
    pub fn num_ways(words: Vec<String>, target: String) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let width = words[0].len();
        let target = target.into_bytes();
        let n = target.len();
        // Fewer columns than target characters: no strictly increasing
        // sequence of that length exists.
        if n > width {
            return 0;
        }

        // char_count[k][c]: how many rows have letter c at column k.
        let mut char_count = vec![[0i64; 26]; width];
        for word in &words {
            let bytes = word.as_bytes();
            for k in 0..width {
                char_count[k][(bytes[k] - b'a') as usize] += 1;
            }
        }

        // dp[i]: ways to have placed the first i target characters using the
        // columns considered so far. Rolled forward one column at a time.
        let mut dp = vec![0i64; n + 1];
        dp[0] = 1;
        for k in 0..width {
            // Walk i downward so dp[i - 1] still reflects the previous
            // column's value when it feeds dp[i] this round -- the usual
            // rolling-knapsack update order.
            for i in (1..=n).rev() {
                let need = (target[i - 1] - b'a') as usize;
                dp[i] = (dp[i] + dp[i - 1] * char_count[k][need]) % MOD;
            }
        }
        dp[n] as i32
    }
}
