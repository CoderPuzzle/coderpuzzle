impl Solution {
    pub fn longest_palindromic_subsequence(s: String, k: i32) -> i32 {
        let bytes = s.as_bytes();
        let n = bytes.len();
        let k = k as usize;
        // dp[i][j][c] = longest palindromic subsequence of s[i..j] using at most c
        // operations.
        let mut dp = vec![vec![vec![0i32; k + 1]; n]; n];
        for i in 0..n {
            for c in 0..=k {
                dp[i][i][c] = 1;
            }
        }
        for length in 2..=n {
            for i in 0..=(n - length) {
                let j = i + length - 1;
                for c in 0..=k {
                    let mut best = dp[i + 1][j][c];
                    if dp[i][j - 1][c] > best {
                        best = dp[i][j - 1][c];
                    }
                    let d = (bytes[i] as i32 - bytes[j] as i32).abs();
                    let d = d.min(26 - d);
                    if d as usize <= c {
                        let val = dp[i + 1][j - 1][c - d as usize] + 2;
                        if val > best {
                            best = val;
                        }
                    }
                    dp[i][j][c] = best;
                }
            }
        }
        dp[0][n - 1][k]
    }
}
