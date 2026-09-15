impl Solution {
    pub fn max_path_score(grid: Vec<Vec<i32>>, k: i32) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        // A path starts on a free cell, so it can charge at most m + n - 2
        // times: budget states beyond min(k, m + n - 2) cannot occur.
        let cap = k.min((m + n - 2) as i32).max(0) as usize;
        const UNREACHABLE: i32 = -(1 << 30);
        // dp[j][c]: best score collected on a path ending at column j of the
        // current row with total cost exactly c; unreachable states sit far
        // below every real score. Cell (0, 0) is 0 by the constraints, so it
        // seeds score 0 at cost 0.
        let mut dp = vec![vec![UNREACHABLE; cap + 1]; n];
        dp[0][0] = 0;
        for i in 0..m {
            let mut next = vec![vec![UNREACHABLE; cap + 1]; n];
            for j in 0..n {
                let charge = if grid[i][j] > 0 { 1 } else { 0 };
                for c in charge..=cap {
                    let mut best = UNREACHABLE;
                    if dp[j][c - charge] > best {
                        best = dp[j][c - charge];
                    }
                    if j > 0 && next[j - 1][c - charge] > best {
                        best = next[j - 1][c - charge];
                    }
                    if best > UNREACHABLE / 2 {
                        next[j][c] = best + grid[i][j];
                    }
                }
            }
            dp = next;
        }
        let best = *dp[n - 1].iter().max().unwrap();
        if best >= 0 {
            best
        } else {
            -1
        }
    }
}
