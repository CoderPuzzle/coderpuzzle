function onesMinusZeros(grid: number[][]): number[][] {
    // Precompute each row's and column's one-count once; the zero counts
    // follow as n - onesRow and m - onesCol, collapsing the cell formula
    // to 2*onesRow + 2*onesCol - m - n.
    const m = grid.length;
    const n = grid[0].length;
    const rowOnes = new Array(m).fill(0);
    const colOnes = new Array(n).fill(0);
    for (let i = 0; i < m; ++i) {
        for (let j = 0; j < n; ++j) {
            rowOnes[i] += grid[i][j];
            colOnes[j] += grid[i][j];
        }
    }
    return Array.from({ length: m }, (_, i) =>
        Array.from({ length: n }, (_, j) => 2 * rowOnes[i] + 2 * colOnes[j] - m - n),
    );
}
