impl Solution {
    // Sweep the rows top to bottom carrying one row of answers: dp[j] is
    // the smallest sum of a falling path ending at the current row's
    // column j, built from the three reachable parents above.
    pub fn min_falling_path_sum(matrix: Vec<Vec<i32>>) -> i32 {
        let n = matrix[0].len();
        let mut dp: Vec<i32> = matrix[0].clone();
        for row in &matrix[1..] {
            let mut next = vec![0; n];
            for j in 0..n {
                let mut best = dp[j];
                if j > 0 && dp[j - 1] < best {
                    best = dp[j - 1];
                }
                if j + 1 < n && dp[j + 1] < best {
                    best = dp[j + 1];
                }
                next[j] = row[j] + best;
            }
            dp = next;
        }
        let mut ans = dp[0];
        for &v in &dp[1..] {
            if v < ans {
                ans = v;
            }
        }
        ans
    }
}
