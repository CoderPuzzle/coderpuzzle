impl Solution {
    pub fn min_distance(word1: String, word2: String) -> i32 {
        let a = word1.as_bytes();
        let b = word2.as_bytes();
        let la = a.len();
        let lb = b.len();
        // dp[i][j] = LCS length of the first i chars of a and first j of b; row/col 0 stay 0.
        let mut dp = vec![vec![0i32; lb + 1]; la + 1];
        for i in 1..=la {
            for j in 1..=lb {
                if a[i - 1] == b[j - 1] {
                    // Matching chars extend the diagonal prefix by one.
                    dp[i][j] = dp[i - 1][j - 1] + 1;
                } else {
                    // Drop the last char of one string and carry the better result forward.
                    dp[i][j] = dp[i - 1][j].max(dp[i][j - 1]);
                }
            }
        }
        // Keep the LCS, delete everything else from both words.
        (la + lb - 2 * dp[la][lb] as usize) as i32
    }
}
