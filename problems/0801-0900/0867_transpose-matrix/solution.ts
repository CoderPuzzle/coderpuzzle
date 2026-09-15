// The transpose swaps indices: the entry at (i, j) moves to (j, i), so
// every input row reappears as an output column. A non-square input
// changes shape — m x n becomes n x m — so the result is a fresh grid,
// never an in-place rewrite.
function transpose(matrix: number[][]): number[][] {
    const m = matrix.length;
    const n = matrix[0].length;
    const result: number[][] = Array.from({ length: n }, () => new Array(m).fill(0));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            result[j][i] = matrix[i][j];
        }
    }
    return result;
}
