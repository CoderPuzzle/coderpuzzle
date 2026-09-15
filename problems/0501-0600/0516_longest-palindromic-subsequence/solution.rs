impl Solution {
    pub fn longest_palindrome_subseq(s: String) -> i32 {
        let s = s.as_bytes();
        let n = s.len();
        if n == 0 {
            return 0;
        }
        // dp[i][j] = longest palindromic subsequence inside s[i..j].
        // Filling i descending and j ascending finalizes the three
        // dependencies (drop left end, drop right end, drop both) first.
        let mut dp = vec![vec![0i32; n]; n];
        for i in (0..n).rev() {
            dp[i][i] = 1;
            for j in (i + 1)..n {
                if s[i] == s[j] {
                    // Matching ends wrap the best inner palindrome; the
                    // zero-filled table yields 0 for an empty inner
                    // interval.
                    dp[i][j] = dp[i + 1][j - 1] + 2;
                } else {
                    // At least one end is absent from an optimal answer.
                    dp[i][j] = dp[i + 1][j].max(dp[i][j - 1]);
                }
            }
        }
        dp[0][n - 1]
    }
}
