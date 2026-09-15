impl Solution {
    pub fn cherry_pickup(grid: Vec<Vec<i32>>) -> i32 {
        let rows = grid.len();
        let cols = grid[0].len();
        const NEG: i32 = -(1 << 30);
        // both robots drop one row per step, so the state is just the column
        // pair; unreachable states stay at NEG and never win a max. Row 0
        // starts: robot 1 leftmost, robot 2 rightmost; a one-column grid has
        // both share the start cell, counted once
        let mut dp = vec![vec![NEG; cols]; cols];
        dp[0][cols - 1] = grid[0][0] + if cols > 1 { grid[0][cols - 1] } else { 0 };
        for r in 1..rows {
            let mut ndp = vec![vec![NEG; cols]; cols];
            for c1 in 0..cols {
                for c2 in 0..cols {
                    // best of the 9 predecessor column pairs (each robot
                    // steps by -1, 0, or +1 between rows)
                    let mut best = NEG;
                    for d1 in [-1i32, 0, 1] {
                        for d2 in [-1i32, 0, 1] {
                            let p1 = c1 as i32 + d1;
                            let p2 = c2 as i32 + d2;
                            if p1 >= 0
                                && p2 >= 0
                                && (p1 as usize) < cols
                                && (p2 as usize) < cols
                                && dp[p1 as usize][p2 as usize] > best
                            {
                                best = dp[p1 as usize][p2 as usize];
                            }
                        }
                    }
                    if best > NEG {
                        // both cells harvested, except a shared cell counts once
                        ndp[c1][c2] = best + grid[r][c1] + if c1 != c2 { grid[r][c2] } else { 0 };
                    }
                }
            }
            dp = ndp;
        }
        // every move is strictly downward, so all paths reach the bottom row
        // together — the answer is the best entry of the last table
        let mut ans = NEG;
        for c1 in 0..cols {
            for c2 in 0..cols {
                if dp[c1][c2] > ans {
                    ans = dp[c1][c2];
                }
            }
        }
        ans
    }
}
