function minFlips(grid: number[][]): number {
    const m = grid.length;
    const n = grid[0].length;
    // Each mirrored pair that disagrees costs exactly one flip; agreeing
    // pairs and any middle cell never do.
    let rows = 0;
    for (const row of grid) {
        for (let lo = 0, hi = n - 1; lo < hi; ++lo, --hi) {
            if (row[lo] !== row[hi]) {
                ++rows;
            }
        }
    }
    let cols = 0;
    for (let j = 0; j < n; ++j) {
        for (let lo = 0, hi = m - 1; lo < hi; ++lo, --hi) {
            if (grid[lo][j] !== grid[hi][j]) {
                ++cols;
            }
        }
    }
    return Math.min(rows, cols);
}
