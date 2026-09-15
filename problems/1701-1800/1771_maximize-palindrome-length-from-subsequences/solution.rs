impl Solution {
    pub fn longest_palindrome(word1: String, word2: String) -> i32 {
        let n1 = word1.len();
        let s = word1 + &word2;
        let s = s.as_bytes();
        let n = s.len();
        // dp[i][j] holds the longest palindromic subsequence of s[i..j];
        // i descends and j ascends so both dependencies are ready.
        let mut dp = vec![vec![0u16; n + 1]; n + 1];
        let mut best: u16 = 0;
        for i in (0..n).rev() {
            dp[i][i] = 1;
            let si = s[i];
            for j in i + 1..n {
                if si == s[j] {
                    let length = dp[i + 1][j - 1] + 2;
                    dp[i][j] = length;
                    // Equal ends straddling the boundary mean both words
                    // contribute at least one character of the palindrome.
                    if i < n1 && j >= n1 && length > best {
                        best = length;
                    }
                } else {
                    dp[i][j] = dp[i + 1][j].max(dp[i][j - 1]);
                }
            }
        }
        best as i32
    }
}
