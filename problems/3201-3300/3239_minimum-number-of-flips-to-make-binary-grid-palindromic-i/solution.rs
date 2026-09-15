impl Solution {
    pub fn min_flips(grid: Vec<Vec<i32>>) -> i32 {
        // Each mirrored pair that disagrees costs exactly one flip; agreeing
        // pairs and any middle cell never do.
        let m = grid.len();
        let n = grid[0].len();
        let mut rows = 0i32;
        let mut cols = 0i32;
        for row in &grid {
            let mut lo = 0usize;
            let mut hi = n - 1;
            while lo < hi {
                if row[lo] != row[hi] {
                    rows += 1;
                }
                lo += 1;
                hi -= 1;
            }
        }
        for j in 0..n {
            let mut lo = 0usize;
            let mut hi = m - 1;
            while lo < hi {
                if grid[lo][j] != grid[hi][j] {
                    cols += 1;
                }
                lo += 1;
                hi -= 1;
            }
        }
        rows.min(cols)
    }
}
