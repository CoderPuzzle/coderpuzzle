impl Solution {
    pub fn num_squares(n: i32) -> i32 {
        let n = n as usize;
        // The squares i*i up to sqrt(n), precomputed once.
        let mut squares: Vec<usize> = Vec::new();
        let mut i = 1usize;
        while i * i <= n {
            squares.push(i * i);
            i += 1;
        }
        // dp[i] = fewest perfect squares summing to i: any decomposition ends
        // with some square s <= i, leaving the subproblem dp[i - s], so
        // dp[i] = 1 + min(dp[i - s]). n+1 beats any real count (n ones), so
        // it serves as infinity.
        let inf = n + 1;
        let mut dp = vec![inf; n + 1];
        // dp[0] = 0: zero squares sum to zero, anchoring the induction.
        dp[0] = 0;
        // Filling i in increasing order means every dp[i - s] consulted is
        // already final.
        for i in 1..=n {
            for &s in &squares {
                if s > i {
                    break;
                }
                if dp[i - s] + 1 < dp[i] {
                    dp[i] = dp[i - s] + 1;
                }
            }
        }
        dp[n] as i32
    }
}
