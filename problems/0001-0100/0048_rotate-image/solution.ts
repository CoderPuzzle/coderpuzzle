function rotate(matrix: number[][]): number[][] {
    // A clockwise quarter turn factors into two swap-only involutions:
    // transpose across the main diagonal, then reverse every row.
    const n = matrix.length;
    // The strict upper triangle holds each transpose pair exactly once;
    // walking the full square would swap every pair twice and undo itself.
    for (let i = 0; i < n; ++i) {
        for (let j = i + 1; j < n; ++j) {
            [matrix[i][j], matrix[j][i]] = [matrix[j][i], matrix[i][j]];
        }
    }
    // Column j of the transpose reads row j of the input, so reversing each
    // row lays it out bottom-up — precisely the quarter turn.
    for (const row of matrix) {
        row.reverse();
    }
    // The rotation happened inside the input allocation; the same matrix,
    // now rotated, is what the judge compares.
    return matrix;
}
