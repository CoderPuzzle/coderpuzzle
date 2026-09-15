function countSubmatrices(grid: number[][], k: number): number {
    const rows = grid.length,
        cols = grid[0].length;
    // colSums[j] accumulates column j over rows 0..i, so a submatrix
    // anchored at (0, 0) is identified by its bottom-right corner (i, j).
    const colSums = new Array(cols).fill(0);
    let count = 0;
    for (let i = 0; i < rows; i++) {
        let prefix = 0;
        for (let j = 0; j < cols; j++) {
            colSums[j] += grid[i][j];
            // prefix is the rectangle sum grid[0..i][0..j].
            prefix += colSums[j];
            // Values are non-negative, so sums only grow with j: once the
            // prefix exceeds k, every further corner in this row fails too.
            if (prefix > k) break;
            count++;
        }
    }
    return count;
}
