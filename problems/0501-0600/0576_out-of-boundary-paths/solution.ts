function findPaths(m: number, n: number, maxMove: number, startRow: number, startColumn: number): number {
    const MOD = 1000000007;
    // Zero moves can never leave the grid.
    if (maxMove === 0) return 0;
    // After t passes, prev[i][j] = paths from (i, j) that exit within t moves.
    let prev: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
    for (let step = 0; step < maxMove; step++) {
        const cur: number[][] = Array.from({ length: m }, () => new Array(n).fill(0));
        for (let i = 0; i < m; i++) {
            for (let j = 0; j < n; j++) {
                let total = 0;
                // An out-of-grid step counts 1 (itself an exit); an in-grid
                // neighbor contributes its full prev count (exit later from there).
                if (i + 1 >= m) total += 1;
                else total += prev[i + 1][j];
                if (i - 1 < 0) total += 1;
                else total += prev[i - 1][j];
                if (j + 1 >= n) total += 1;
                else total += prev[i][j + 1];
                if (j - 1 < 0) total += 1;
                else total += prev[i][j - 1];
                cur[i][j] = total % MOD;
            }
        }
        // Each pass only needs the previous layer.
        prev = cur;
    }
    return prev[startRow][startColumn] % MOD;
}
