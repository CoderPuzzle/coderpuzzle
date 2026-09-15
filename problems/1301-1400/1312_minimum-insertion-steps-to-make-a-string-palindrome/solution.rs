impl Solution {
    pub fn min_insertions(s: String) -> i32 {
        let b = s.as_bytes();
        let n = b.len();
        if n == 0 {
            return 0;
        }
        let mut dp = vec![vec![0i32; n]; n];
        for length in 2..=n {
            for i in 0..=n - length {
                let j = i + length - 1;
                if b[i] == b[j] {
                    dp[i][j] = if length > 2 { dp[i + 1][j - 1] } else { 0 };
                } else {
                    dp[i][j] = 1 + dp[i + 1][j].min(dp[i][j - 1]);
                }
            }
        }
        dp[0][n - 1]
    }
}
