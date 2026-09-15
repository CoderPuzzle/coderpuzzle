impl Solution {
    pub fn maximal_square(matrix: Vec<Vec<String>>) -> i32 {
        let m = matrix.len();
        let n = matrix[0].len();
        let mut best = 0;
        // Two rolling rows of length n + 1: dp[i][j] is the side of the
        // largest all-ones square ending at (i, j); the leading zero column
        // stands in for the out-of-bounds left border.
        let mut prev = vec![0i32; n + 1];
        for i in 0..m {
            let mut curr = vec![0i32; n + 1];
            for j in 0..n {
                if matrix[i][j] == "1" {
                    // A square growing out of this corner must fit inside all
                    // three predecessors: up, left, and diagonal — so the
                    // minimum is the binding constraint.
                    curr[j + 1] = prev[j].min(prev[j + 1]).min(curr[j]) + 1;
                    best = best.max(curr[j + 1]);
                }
            }
            prev = curr;
        }
        best * best
    }
}
