function minCost(grid: number[][]): number {
    // Every cell value is at most 1023 (10 bits), so any path XOR is in
    // 0..1023. reach[i][j][x] records whether a path ending at (i, j) can
    // achieve XOR x.
    const m = grid.length;
    const n = grid[0].length;
    const reach: boolean[][][] = Array.from({ length: m }, () =>
        Array.from({ length: n }, () => new Array<boolean>(1024).fill(false)),
    );
    reach[0][0][grid[0][0]] = true;
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;
            const v = grid[i][j];
            for (let x = 0; x < 1024; x++) {
                if ((i > 0 && reach[i - 1][j][x]) || (j > 0 && reach[i][j - 1][x])) {
                    reach[i][j][x ^ v] = true;
                }
            }
        }
    }
    // The smallest reachable XOR at the bottom-right cell is the answer.
    for (let x = 0; x < 1024; x++) {
        if (reach[m - 1][n - 1][x]) return x;
    }
    return -1;
}
