impl Solution {
    pub fn num_ways(steps: i32, arrLen: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let steps = steps as usize;
        // each move shifts the position by at most one, so only the window
        // min(arrLen, steps + 1) is reachable — cost is independent of a
        // huge arrLen
        let n = (arrLen as usize).min(steps + 1);
        // dp[i] = number of ways to stand at position i after the moves
        // processed so far
        let mut dp = vec![0i64; n];
        let mut ndp = vec![0i64; n];
        dp[0] = 1;
        for _ in 0..steps {
            for i in 0..n {
                // stay, or arrive from the left/right neighbor — both
                // guarded by the window bounds
                let mut total = dp[i];
                if i > 0 {
                    total += dp[i - 1];
                }
                if i + 1 < n {
                    total += dp[i + 1];
                }
                ndp[i] = total % MOD;
            }
            std::mem::swap(&mut dp, &mut ndp);
        }
        // walks that return to the origin after exactly `steps` moves
        dp[0] as i32
    }
}
