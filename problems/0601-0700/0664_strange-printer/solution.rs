impl Solution {
    pub fn strange_printer(s: String) -> i32 {
        // dp[i][j] is the fewest turns that print s[i..j]. The stroke that
        // leaves s[i] standing either covers i alone, dp[i+1][j] + 1, or
        // runs on to some k with s[k] == s[i]: that stroke is shared with
        // the suffix s[k..j] while the overprinted gap s[i+1..k-1] is
        // solved on its own, dp[i+1][k-1] + dp[k][j].
        let s = s.as_bytes();
        let n = s.len();
        let mut dp = vec![vec![0i32; n]; n];
        for i in (0..n).rev() {
            dp[i][i] = 1;
            for j in i + 1..n {
                let mut best = dp[i + 1][j] + 1;
                for k in i + 1..=j {
                    if s[k] == s[i] {
                        best = best.min(dp[i + 1][k - 1] + dp[k][j]);
                    }
                }
                dp[i][j] = best;
            }
        }
        dp[0][n - 1]
    }
}
