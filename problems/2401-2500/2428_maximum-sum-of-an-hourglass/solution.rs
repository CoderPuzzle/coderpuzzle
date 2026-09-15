impl Solution {
    pub fn max_sum(grid: Vec<Vec<i32>>) -> i32 {
        // Every hourglass is the top and bottom rows of a 3x3 submatrix
        // plus its center cell, so one pass over all top-left corners of
        // such submatrices visits each hourglass exactly once. Seven cells
        // of at most 1e6 sum to at most 7e6, well inside i32.
        let mut best = 0;
        for r in 0..grid.len() - 2 {
            for c in 0..grid[0].len() - 2 {
                let current = grid[r][c]
                    + grid[r][c + 1]
                    + grid[r][c + 2]
                    + grid[r + 1][c + 1]
                    + grid[r + 2][c]
                    + grid[r + 2][c + 1]
                    + grid[r + 2][c + 2];
                if current > best {
                    best = current;
                }
            }
        }
        best
    }
}
