impl Solution {
    // Cells with i - j >= 0 form the bottom-left triangle together with
    // the middle diagonal (descending); i - j < 0 is the top-right
    // triangle (ascending). Visiting row-major keeps every diagonal's
    // values in top-left-to-bottom-right order, so one cursor per diagonal
    // pours them back in place.
    pub fn sort_matrix(grid: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let n = grid.len();
        let mut diags: Vec<Vec<i32>> = vec![Vec::new(); 2 * n - 1];
        for i in 0..n {
            for j in 0..n {
                diags[i + n - 1 - j].push(grid[i][j]);
            }
        }
        for (k, d) in diags.iter_mut().enumerate() {
            if k >= n - 1 {
                d.sort_by(|a, b| b.cmp(a));
            } else {
                d.sort();
            }
        }
        let mut pos = vec![0usize; 2 * n - 1];
        let mut out = vec![vec![0i32; n]; n];
        for i in 0..n {
            for j in 0..n {
                let k = i + n - 1 - j;
                out[i][j] = diags[k][pos[k]];
                pos[k] += 1;
            }
        }
        out
    }
}
