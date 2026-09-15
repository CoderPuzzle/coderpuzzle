impl Solution {
    // Scores telescope: however many intermediate hops a journey
    // takes, its total is simply end - start. So only the endpoint
    // pair matters, and the end must sit strictly below or to the
    // right of the start (componentwise). A row-major sweep carries
    // prefix_min[r][c], the smallest value in the rectangle on or
    // above-left of (r, c); strip the cell itself from that rectangle
    // and what remains is exactly its legal start set, split as "row
    // above" plus "running minimum to the left". Answers stay within
    // ±(10⁵ − 1); the i64 accumulator simply matches the declared
    // return.
    pub fn max_score(grid: Vec<Vec<i32>>) -> i64 {
        let (m, n) = (grid.len(), grid[0].len());
        const BIG: i64 = 1_000_000_000_000_000_000;
        let mut prefix_min = vec![vec![0i64; n]; m];
        let mut best = -BIG;
        for r in 0..m {
            let mut row_running = BIG;
            for c in 0..n {
                let above = if r > 0 { prefix_min[r - 1][c] } else { BIG };
                let start_val = above.min(row_running);
                best = best.max(grid[r][c] as i64 - start_val);
                row_running = row_running.min(grid[r][c] as i64);
                prefix_min[r][c] = start_val.min(grid[r][c] as i64);
            }
        }
        best
    }
}
