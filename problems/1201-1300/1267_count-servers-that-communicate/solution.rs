impl Solution {
    pub fn count_servers(grid: Vec<Vec<i32>>) -> i32 {
        // A server communicates iff its row or its column holds another
        // server — any communicating partner must share one of those lines,
        // so tallies per line settle it without searching the pair graph.
        let m = grid.len();
        let n = grid[0].len();
        let mut row = vec![0i32; m];
        let mut col = vec![0i32; n];
        for r in 0..m {
            for c in 0..n {
                if grid[r][c] == 1 {
                    row[r] += 1;
                    col[c] += 1;
                }
            }
        }
        let mut total = 0;
        for r in 0..m {
            for c in 0..n {
                if grid[r][c] == 1 && (row[r] > 1 || col[c] > 1) {
                    total += 1;
                }
            }
        }
        total
    }
}
