impl Solution {
    pub fn number_of_right_triangles(grid: Vec<Vec<i32>>) -> i64 {
        // Every right triangle has a unique corner cell: its horizontal
        // leg endpoint and vertical leg endpoint can be picked
        // independently from the other 1s in that row and column. A
        // collinear triple never qualifies, so the corner count is exact.
        // Accumulate in i64: up to 10^6 * 999 * 999 ~= 9.98e11 > 2^31.
        let rows = grid.len();
        let cols = grid[0].len();
        let mut row_ones = vec![0i64; rows];
        let mut col_ones = vec![0i64; cols];
        for r in 0..rows {
            for c in 0..cols {
                if grid[r][c] == 1 {
                    row_ones[r] += 1;
                    col_ones[c] += 1;
                }
            }
        }
        let mut total: i64 = 0;
        for r in 0..rows {
            for c in 0..cols {
                if grid[r][c] == 1 {
                    total += (row_ones[r] - 1) * (col_ones[c] - 1);
                }
            }
        }
        total
    }
}
