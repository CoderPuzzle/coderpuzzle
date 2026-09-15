impl Solution {
    pub fn longest_palindrome_subseq(s: String) -> i32 {
        // Interval DP keyed by the outermost pair's letter: dp[l][r][c] is
        // the longest good palindromic subsequence inside s[l..r] whose
        // first and last characters are both c; nesting a pair around an
        // inner one requires the two letters to differ.
        let s = s.as_bytes();
        let n = s.len();
        let mut dp = vec![vec![[0i32; 26]; n]; n];
        for l in (0..n).rev() {
            for r in l + 1..n {
                for c in 0..26 {
                    // Read the carried neighbours first: writing straight
                    // through dp would borrow it twice in one statement.
                    let v = dp[l][r - 1][c].max(dp[l + 1][r][c]);
                    dp[l][r][c] = v;
                }
                if s[l] == s[r] {
                    let c0 = (s[l] - b'a') as usize;
                    // Best inner length avoiding the outer letter: the row
                    // maximum when it peaks elsewhere, the best of the other
                    // 25 letters when the row peaks exactly at c0.
                    let inner = &dp[l + 1][r - 1];
                    let (mut best1, mut best2, mut arg1) = (-1, -1, 0);
                    for c in 0..26 {
                        let v = inner[c];
                        if v > best1 {
                            best2 = best1;
                            best1 = v;
                            arg1 = c;
                        } else if v > best2 {
                            best2 = v;
                        }
                    }
                    let best = if arg1 == c0 { best2 } else { best1 };
                    if 2 + best > dp[l][r][c0] {
                        dp[l][r][c0] = 2 + best;
                    }
                }
            }
        }
        dp[0][n - 1].iter().copied().max().unwrap_or(0)
    }
}
