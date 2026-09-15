impl Solution {
    pub fn find_paths(m: i32, n: i32, max_move: i32, start_row: i32, start_column: i32) -> i32 {
        const MOD: i64 = 1_000_000_007;
        // Zero moves can never leave the grid.
        if max_move == 0 {
            return 0;
        }
        let m = m as usize;
        let n = n as usize;
        // After t passes, prev[i][j] = paths from (i, j) that exit within t moves.
        let mut prev = vec![vec![0i64; n]; m];
        for _ in 0..max_move {
            let mut cur = vec![vec![0i64; n]; m];
            for i in 0..m {
                for j in 0..n {
                    let mut total: i64 = 0;
                    // An out-of-grid step counts 1 (itself an exit); an in-grid
                    // neighbor contributes its full prev count (exit later from there).
                    if i + 1 >= m {
                        total += 1;
                    } else {
                        total += prev[i + 1][j];
                    }
                    if i == 0 {
                        total += 1;
                    } else {
                        total += prev[i - 1][j];
                    }
                    if j + 1 >= n {
                        total += 1;
                    } else {
                        total += prev[i][j + 1];
                    }
                    if j == 0 {
                        total += 1;
                    } else {
                        total += prev[i][j - 1];
                    }
                    cur[i][j] = total % MOD;
                }
            }
            // Each pass only needs the previous layer.
            prev = cur;
        }
        prev[start_row as usize][start_column as usize] as i32
    }
}
