function sortMatrix(grid: number[][]): number[][] {
    // Cells with i - j >= 0 form the bottom-left triangle together with
    // the middle diagonal (descending); i - j < 0 is the top-right
    // triangle (ascending). Visiting row-major keeps every diagonal's
    // values in top-left-to-bottom-right order, so one cursor per diagonal
    // pours them back in place.
    const n = grid.length;
    const diags: number[][] = Array.from({ length: 2 * n - 1 }, () => []);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            diags[i - j + n - 1].push(grid[i][j]);
        }
    }
    for (let k = 0; k < 2 * n - 1; k++) {
        diags[k].sort((a: number, b: number) => (k >= n - 1 ? b - a : a - b));
    }
    const pos: number[] = new Array(2 * n - 1).fill(0);
    return grid.map((row: number[], i: number) =>
        row.map((_: number, j: number) => {
            const k = i - j + n - 1;
            return diags[k][pos[k]++];
        }),
    );
}
