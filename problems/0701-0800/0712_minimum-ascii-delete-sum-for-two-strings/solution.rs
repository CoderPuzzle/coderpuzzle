impl Solution {
    pub fn minimum_delete_sum(s1: String, s2: String) -> i32 {
        let a: Vec<i64> = s1.chars().map(|c| c as i64).collect();
        let b: Vec<i64> = s2.chars().map(|c| c as i64).collect();
        let la = a.len();
        let lb = b.len();
        // dp[i][j] = min deleted-ASCII cost of equalizing the prefixes a[:i], b[:j].
        let mut dp = vec![vec![0i64; lb + 1]; la + 1];
        // Base row/column: matching against the empty string deletes everything.
        for j in 1..=lb {
            dp[0][j] = dp[0][j - 1] + b[j - 1];
        }
        for i in 1..=la {
            dp[i][0] = dp[i - 1][0] + a[i - 1];
            for j in 1..=lb {
                if a[i - 1] == b[j - 1] {
                    // Equal chars are both kept — free reduction to shorter prefixes.
                    dp[i][j] = dp[i - 1][j - 1];
                } else {
                    // A mismatch can retain at most one end: pay its ASCII value.
                    dp[i][j] = (dp[i - 1][j] + a[i - 1]).min(dp[i][j - 1] + b[j - 1]);
                }
            }
        }
        dp[la][lb] as i32
    }
}
