impl Solution {
    pub fn is_valid_palindrome(s: String, k: i32) -> bool {
        let b = s.as_bytes();
        let n = b.len();
        if n == 0 {
            return true;
        }
        // Reformulation: deleting <= k chars to leave a palindrome is the same
        // as keeping a palindromic subsequence of length >= n - k.
        let mut dp = vec![vec![0i32; n]; n];
        // dp[i][j] = LPS length of s[i..j]; filling i right-to-left means every
        // strictly smaller interval used below is already computed.
        for i in (0..n).rev() {
            dp[i][i] = 1;
            for j in i + 1..n {
                if b[i] == b[j] {
                    // Matching ends wrap around whatever is best inside.
                    dp[i][j] = dp[i + 1][j - 1] + 2;
                } else {
                    // Ends differ: discard one of them, keep the better shrunk interval.
                    dp[i][j] = dp[i + 1][j].max(dp[i][j - 1]);
                }
            }
        }
        // Turn the kept-subsequence length back into a deletion count.
        n as i32 - dp[0][n - 1] <= k
    }
}
