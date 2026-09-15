impl Solution {
    pub fn min_total_distance(grid: Vec<Vec<i32>>) -> i32 {
        // A row-major sweep collects the row indexes already sorted; a
        // column-major sweep does the same for the column indexes, so
        // neither axis needs an explicit sort.
        let m = grid.len();
        let n = grid[0].len();
        let mut rows = Vec::new();
        let mut cols = Vec::new();
        for r in 0..m {
            for c in 0..n {
                if grid[r][c] == 1 {
                    rows.push(r as i32);
                }
            }
        }
        for c in 0..n {
            for r in 0..m {
                if grid[r][c] == 1 {
                    cols.push(c as i32);
                }
            }
        }
        // Manhattan distance adds the two axes independently, and on a line a
        // median of the coordinates minimizes the sum of absolute differences
        // — so the answer is the two spreads around the two medians.
        let row_pivot = rows[rows.len() / 2];
        let col_pivot = cols[cols.len() / 2];
        // With an even count, every index between the two middle ones ties
        // for the minimum; the upper middle is as good as any.
        let mut total = 0;
        for &r in &rows {
            total += (r - row_pivot).abs();
        }
        for &c in &cols {
            total += (c - col_pivot).abs();
        }
        total
    }
}
