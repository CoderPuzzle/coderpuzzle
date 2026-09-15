function largestLocal(grid: number[][]): number[][] {
    // Two passes shrink the window work from 9 comparisons per output cell
    // to 6: first collapse every row of 3 horizontally, then take the
    // vertical max of those results.
    const n = grid.length;
    const rowMax: number[][] = [];
    for (let i = 0; i < n; ++i) {
        rowMax.push(Array.from({ length: n - 2 }, (_, j) => Math.max(grid[i][j], grid[i][j + 1], grid[i][j + 2])));
    }
    return Array.from({ length: n - 2 }, (_, i) =>
        Array.from({ length: n - 2 }, (_, j) => Math.max(rowMax[i][j], rowMax[i + 1][j], rowMax[i + 2][j])),
    );
}
