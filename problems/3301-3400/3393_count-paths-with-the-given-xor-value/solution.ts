function countPathsWithXorValue(grid: number[][], k: number): number {
    const MOD = 1000000007;
    const m = grid.length;
    const n = grid[0].length;
    // dp[i][j][x] = number of paths from (0,0) to (i,j) whose XOR is x
    const dp: number[][][] = new Array(m);
    for (let i = 0; i < m; i++) {
        const row: number[][] = new Array(n);
        for (let j = 0; j < n; j++) {
            row[j] = new Array(16).fill(0);
        }
        dp[i] = row;
    }
    dp[0][0][grid[0][0]] = 1;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;
            const cell = grid[i][j];
            for (let x = 0; x < 16; x++) {
                let total = 0;
                if (i > 0) total += dp[i - 1][j][x ^ cell];
                if (j > 0) total += dp[i][j - 1][x ^ cell];
                dp[i][j][x] = total % MOD;
            }
        }
    }
    return dp[m - 1][n - 1][k];
}
