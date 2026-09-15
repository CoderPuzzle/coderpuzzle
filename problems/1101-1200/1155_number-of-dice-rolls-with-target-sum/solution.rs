impl Solution {
    pub fn num_rolls_to_target(n: i32, k: i32, target: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        let n = n as usize;
        let k = k as usize;
        let target = target as usize;
        // dp[t]: ways for the dice processed so far to show sum t
        let mut dp = vec![0i64; target + 1];
        let mut ndp = vec![0i64; target + 1];
        // zero dice reach sum 0 in exactly one way
        dp[0] = 1;
        for _ in 0..n {
            // fresh values per die: the transition reads only the previous
            // die's distribution, else one die could count twice
            for t in 1..=target {
                // every face value f is a distinct outcome, so all faces are
                // summed; hi = min(k, t) skips faces that overshoot
                let hi = k.min(t);
                let mut s: i64 = 0;
                for f in 1..=hi {
                    s += dp[t - f];
                }
                ndp[t] = s % MOD;
            }
            std::mem::swap(&mut dp, &mut ndp);
            // only the swapped-out table's old base needs clearing
            ndp[0] = 0;
        }
        // targets no die sequence reaches were never written, so read as 0
        dp[target] as i32
    }
}
