impl Solution {
    // Two passes shrink the window work from 9 comparisons per output cell
    // to 6: first collapse every row of 3 horizontally, then take the
    // vertical max of those results.
    pub fn largest_local(grid: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let n = grid.len();
        let mut row_max = vec![vec![0i32; n - 2]; n];
        for i in 0..n {
            for j in 0..n - 2 {
                row_max[i][j] = grid[i][j].max(grid[i][j + 1]).max(grid[i][j + 2]);
            }
        }
        let mut max_local = vec![vec![0i32; n - 2]; n - 2];
        for i in 0..n - 2 {
            for j in 0..n - 2 {
                max_local[i][j] = row_max[i][j].max(row_max[i + 1][j]).max(row_max[i + 2][j]);
            }
        }
        max_local
    }
}
