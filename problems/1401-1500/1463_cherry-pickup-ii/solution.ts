function cherryPickup(grid: number[][]): number {
    const rows = grid.length;
    const cols = grid[0].length;
    const NEG = -Infinity;
    let dp: number[][] = Array.from({ length: cols }, () => new Array(cols).fill(NEG));
    // both robots drop one row per step, so the state is just the column
    // pair; unreachable states stay at -Infinity and never win a max.
    // Row 0 starts: robot 1 leftmost, robot 2 rightmost; a one-column grid
    // has both share the start cell, counted once
    dp[0][cols - 1] = grid[0][0] + (cols > 1 ? grid[0][cols - 1] : 0);
    for (let r = 1; r < rows; r++) {
        const ndp = Array.from({ length: cols }, () => new Array(cols).fill(NEG));
        for (let c1 = 0; c1 < cols; c1++) {
            for (let c2 = 0; c2 < cols; c2++) {
                // best of the 9 predecessor column pairs (each robot
                // steps by -1, 0, or +1 between rows)
                let best = NEG;
                for (let d1 = -1; d1 <= 1; d1++) {
                    for (let d2 = -1; d2 <= 1; d2++) {
                        const p1 = c1 + d1;
                        const p2 = c2 + d2;
                        if (p1 >= 0 && p1 < cols && p2 >= 0 && p2 < cols && dp[p1][p2] > best) {
                            best = dp[p1][p2];
                        }
                    }
                }
                if (best > NEG) {
                    // both cells harvested, except a shared cell counts once
                    ndp[c1][c2] = best + grid[r][c1] + (c1 !== c2 ? grid[r][c2] : 0);
                }
            }
        }
        dp = ndp;
    }
    // every move is strictly downward, so all paths reach the bottom row
    // together — the answer is the best entry of the last table
    let ans = NEG;
    for (let c1 = 0; c1 < cols; c1++) {
        for (let c2 = 0; c2 < cols; c2++) {
            if (dp[c1][c2] > ans) {
                ans = dp[c1][c2];
            }
        }
    }
    return ans;
}
