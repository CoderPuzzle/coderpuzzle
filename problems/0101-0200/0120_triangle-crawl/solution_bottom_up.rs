impl Solution {
    pub fn minimum_total(triangle: Vec<Vec<i32>>) -> i32 {
        let n = triangle.len();
        // dp[i] = minimum path sum from column i of the current row to the
        // bottom. The last row seeds it directly: a path starting there is
        // just that cell. Sums accumulate in i64s for headroom.
        let mut dp: Vec<i64> = triangle[n - 1].iter().map(|&v| v as i64).collect();
        // Work bottom-up: every cell has exactly the two children i and i+1
        // below, so no ragged-edge special cases like a top-down sweep.
        for row in (0..n.saturating_sub(1)).rev() {
            for i in 0..triangle[row].len() {
                // Ascending i is safe in place: dp[i+1] still holds the row
                // below's value when read. dp shrinks to dp[0] at the apex.
                dp[i] = triangle[row][i] as i64 + dp[i].min(dp[i + 1]);
            }
        }
        dp[0] as i32
    }
}
