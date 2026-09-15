impl Solution {
    pub fn max_distance(grid: Vec<Vec<i32>>) -> i32 {
        let n = grid.len();
        // distance field: land starts at 0, water at a sentinel standing in
        // for infinity; any value above the largest possible distance
        // (2n - 2) is safe, and n * n is a convenient pick
        let inf = (n * n) as i32;
        let mut dist = vec![vec![inf; n]; n];
        let mut has_land = false;
        let mut has_water = false;
        for i in 0..n {
            for j in 0..n {
                if grid[i][j] == 1 {
                    dist[i][j] = 0;
                    has_land = true;
                } else {
                    has_water = true;
                }
            }
        }
        // all water (nothing to measure from) or all land (nothing to measure)
        if !has_land || !has_water {
            return -1;
        }
        // two-pass DP, first sweep: top-left to bottom-right, so every cell
        // relaxes against its up and left neighbors plus one step
        for i in 0..n {
            for j in 0..n {
                if i > 0 && dist[i - 1][j] + 1 < dist[i][j] {
                    dist[i][j] = dist[i - 1][j] + 1;
                }
                if j > 0 && dist[i][j - 1] + 1 < dist[i][j] {
                    dist[i][j] = dist[i][j - 1] + 1;
                }
            }
        }
        // second sweep: bottom-right to top-left, covering down and right; the
        // four directions together span every Manhattan path
        let mut best = 0;
        for i in (0..n).rev() {
            for j in (0..n).rev() {
                if i + 1 < n && dist[i + 1][j] + 1 < dist[i][j] {
                    dist[i][j] = dist[i + 1][j] + 1;
                }
                if j + 1 < n && dist[i][j + 1] + 1 < dist[i][j] {
                    dist[i][j] = dist[i][j + 1] + 1;
                }
                // land stays at 0, so a plain running max over the field works
                if dist[i][j] > best {
                    best = dist[i][j];
                }
            }
        }
        best
    }
}
