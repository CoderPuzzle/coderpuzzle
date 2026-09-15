function getBiggestThree(grid: number[][]): number[] {
    // Enumerate every (center, k) rhombus by walking its four edges;
    // keep distinct sums and return the three largest. Max sum is 2500 *
    // 1e5 = 2.5e8, exact as a JS number.
    const m = grid.length;
    const n = grid[0].length;
    const sums = new Set<number>();
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            for (let k = 0; ; k++) {
                if (r - k < 0 || r + k >= m || c - k < 0 || c + k >= n) {
                    break;
                }
                let total = 0;
                if (k === 0) {
                    total = grid[r][c];
                } else {
                    for (let i = 0; i < k; i++) {
                        total += grid[r - k + i][c - i];
                        total += grid[r + i][c - k + i];
                        total += grid[r + k - i][c + i];
                        total += grid[r - i][c + k - i];
                    }
                }
                sums.add(total);
            }
        }
    }
    return [...sums].sort((a, b) => b - a).slice(0, 3);
}
