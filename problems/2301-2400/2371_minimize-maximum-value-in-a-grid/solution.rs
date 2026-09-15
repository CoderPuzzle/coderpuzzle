impl Solution {
    pub fn min_score(grid: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = grid.len();
        let n = grid[0].len();
        let mut cells: Vec<(i32, usize, usize)> = Vec::with_capacity(m * n);
        for r in 0..m {
            for c in 0..n {
                cells.push((grid[r][c], r, c));
            }
        }
        // Assign in ascending original order: when a cell's turn comes, every
        // smaller cell sharing its row/column is already placed, so only the
        // running maxima of that row and column constrain it.
        cells.sort();
        let mut row_max = vec![0i32; m];
        let mut col_max = vec![0i32; n];
        let mut res = vec![vec![0i32; n]; m];
        for &(_, r, c) in &cells {
            // Smallest legal replacement: 1 + max of what's already in the
            // row/column; larger demands come only from unplaced cells, which
            // receive strictly larger values later by construction.
            let v = 1 + std::cmp::max(row_max[r], col_max[c]);
            res[r][c] = v;
            row_max[r] = v;
            col_max[c] = v;
        }
        res
    }
}
