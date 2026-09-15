impl Solution {
    pub fn count_submatrices(grid: Vec<Vec<i32>>, k: i32) -> i32 {
        let rows = grid.len();
        let cols = grid[0].len();
        // col_sums[j] accumulates column j over rows 0..i, so a submatrix
        // anchored at (0, 0) is identified by its bottom-right corner (i, j).
        let mut col_sums = vec![0i64; cols];
        let mut count: i32 = 0;
        for i in 0..rows {
            let mut prefix: i64 = 0;
            for j in 0..cols {
                col_sums[j] += grid[i][j] as i64;
                // prefix is the rectangle sum grid[0..i][0..j].
                prefix += col_sums[j];
                // Values are non-negative, so sums only grow with j: once the
                // prefix exceeds k, every further corner in this row fails too.
                if prefix > k as i64 {
                    break;
                }
                count += 1;
            }
        }
        count
    }
}
