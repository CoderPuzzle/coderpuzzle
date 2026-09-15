function numberOfRightTriangles(grid: number[][]): number {
    // Every right triangle has a unique corner cell: its horizontal leg
    // endpoint and vertical leg endpoint can be picked independently from
    // the other 1s in that row and column. A collinear triple never
    // qualifies, so the corner count is exact. The worst case stays below
    // 10^6 * 999 * 999 ~= 9.98e11 < 2^53, so number is exact.
    const rows = grid.length;
    const cols = grid[0].length;
    const rowOnes: number[] = grid.map((row) => row.reduce((a, v) => a + v, 0));
    const colOnes: number[] = Array(cols).fill(0);
    for (const row of grid) {
        for (let c = 0; c < cols; ++c) colOnes[c] += row[c];
    }
    let total = 0;
    for (let r = 0; r < rows; ++r) {
        for (let c = 0; c < cols; ++c) {
            if (grid[r][c] === 1) {
                total += (rowOnes[r] - 1) * (colOnes[c] - 1);
            }
        }
    }
    return total;
}
