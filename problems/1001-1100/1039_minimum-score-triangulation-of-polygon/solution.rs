impl Solution {
    pub fn min_score_triangulation(values: Vec<i32>) -> i32 {
        let n = values.len();
        let mut dp = vec![vec![0i32; n]; n];
        for gap in 2..n {
            for i in 0..n - gap {
                let j = i + gap;
                let mut best = i32::MAX;
                for k in (i + 1)..j {
                    let candidate = dp[i][k] + dp[k][j] + values[i] * values[k] * values[j];
                    if candidate < best {
                        best = candidate;
                    }
                }
                dp[i][j] = best;
            }
        }
        dp[0][n - 1]
    }
}
