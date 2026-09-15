use std::collections::HashSet;

impl Solution {
    pub fn has_valid_path(grid: Vec<Vec<String>>) -> bool {
        // dp[r][c] is the set of balances reachable at that cell, where the
        // balance counts '(' minus ')' along the path. A prefix whose balance
        // ever goes negative can never close into a valid string, so those
        // balances are dropped as each move is extended.
        let m = grid.len();
        let n = grid[0].len();
        let start = if grid[0][0] == "(" { 1 } else { -1 };
        if start < 0 {
            return false;
        }
        let mut dp: Vec<Vec<HashSet<i32>>> = (0..m).map(|_| (0..n).map(|_| HashSet::new()).collect()).collect();
        dp[0][0].insert(start);
        for r in 0..m {
            for c in 0..n {
                let balances: Vec<i32> = dp[r][c].iter().copied().collect();
                for balance in balances {
                    if r + 1 < m {
                        let nb = balance + if grid[r + 1][c] == "(" { 1 } else { -1 };
                        if nb >= 0 {
                            dp[r + 1][c].insert(nb);
                        }
                    }
                    if c + 1 < n {
                        let nb = balance + if grid[r][c + 1] == "(" { 1 } else { -1 };
                        if nb >= 0 {
                            dp[r][c + 1].insert(nb);
                        }
                    }
                }
            }
        }
        dp[m - 1][n - 1].contains(&0)
    }
}
