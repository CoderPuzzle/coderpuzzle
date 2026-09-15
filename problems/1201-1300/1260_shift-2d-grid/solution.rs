impl Solution {
    pub fn shift_grid(grid: Vec<Vec<i32>>, k: i32) -> Vec<Vec<i32>> {
        let (m, n) = (grid.len(), grid[0].len());
        let total = (m * n) as i64;
        let k = (k as i64).rem_euclid(total) as usize;
        // One shift = a cyclic right-rotation of the flattened grid.
        let mut shifted = vec![0i32; total as usize];
        for r in 0..m {
            for c in 0..n {
                shifted[(r * n + c + k) % (total as usize)] = grid[r][c];
            }
        }
        let mut result = vec![vec![0i32; n]; m];
        for (i, v) in shifted.iter().enumerate() {
            result[i / n][i % n] = *v;
        }
        result
    }
}
