impl Solution {
    pub fn unique_paths(grid: Vec<Vec<i32>>) -> i32 {
        let m = grid.len();
        let n = grid[0].len();
        const MOD: i64 = 1_000_000_007;
        // Landing tables for mirror cells: entering a mirror while moving
        // right (br) turns the move down, while moving down (bd) turns it
        // right; -1 marks a chain that leaves the grid. Each deflection
        // lands one row below or one column right of the mirror hit, so a
        // reverse row-major sweep resolves every chain against entries
        // that are already final.
        let mut br = vec![-1i32; m * n];
        let mut bd = vec![-1i32; m * n];
        for i in (0..m).rev() {
            for j in (0..n).rev() {
                if grid[i][j] == 0 {
                    continue;
                }
                let t = i * n + j;
                if i + 1 < m {
                    br[t] = if grid[i + 1][j] == 0 { (t + n) as i32 } else { bd[t + n] };
                }
                if j + 1 < n {
                    bd[t] = if grid[i][j + 1] == 0 { (t + 1) as i32 } else { br[t + 1] };
                }
            }
        }
        // dp[k] counts the ways to stand on cell k. Every jump lands in a
        // strictly later row than the cell it leaves, so one row-major sweep
        // settles each cell before any descendant reads it.
        let mut dp = vec![0i64; m * n];
        dp[0] = 1;
        for i in 0..m {
            for j in 0..n {
                let v = dp[i * n + j];
                if v == 0 {
                    continue;
                }
                if j + 1 < n {
                    let t = i * n + j + 1;
                    let tgt = if grid[i][j + 1] == 0 { t as i32 } else { br[t] };
                    if tgt >= 0 {
                        dp[tgt as usize] = (dp[tgt as usize] + v) % MOD;
                    }
                }
                if i + 1 < m {
                    let t = (i + 1) * n + j;
                    let tgt = if grid[i + 1][j] == 0 { t as i32 } else { bd[t] };
                    if tgt >= 0 {
                        dp[tgt as usize] = (dp[tgt as usize] + v) % MOD;
                    }
                }
            }
        }
        dp[m * n - 1] as i32
    }
}
