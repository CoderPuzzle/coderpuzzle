use std::collections::HashSet;

impl Solution {
    // Each main diagonal is swept once downward and once upward. The
    // downward pass records, per cell, how many distinct values lie
    // strictly left-above (the running set size before inserting the
    // cell itself); the upward pass rebuilds the same count for
    // right-below and combines the two.
    pub fn difference_of_distinct_values(grid: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        let m = grid.len();
        let n = grid[0].len();
        let mut ans = vec![vec![0i32; n]; m];
        let mut starts: Vec<(usize, usize)> = Vec::new();
        for r in 0..m {
            starts.push((r, 0));
        }
        for c in 1..n {
            starts.push((0, c));
        }
        for (sr, sc) in &starts {
            let mut left_above: HashSet<i32> = HashSet::new();
            let mut length = 0usize;
            let mut r = *sr;
            let mut c = *sc;
            while r < m && c < n {
                ans[r][c] = left_above.len() as i32;
                left_above.insert(grid[r][c]);
                length += 1;
                r += 1;
                c += 1;
            }
            let mut right_below: HashSet<i32> = HashSet::new();
            for k in (0..length).rev() {
                let x = sr + k;
                let y = sc + k;
                ans[x][y] = (ans[x][y] - right_below.len() as i32).abs();
                right_below.insert(grid[x][y]);
            }
        }
        ans
    }
}
