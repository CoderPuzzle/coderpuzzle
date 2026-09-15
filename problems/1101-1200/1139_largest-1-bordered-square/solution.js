/**
 * @param {number[][]} grid
 * @return {number}
 */
var largest1BorderedSquare = function (grid) {
    const rows = grid.length,
        cols = grid[0].length;
    // prefix[i][j] = sum of the grid rectangle [0..i) x [0..j)
    const prefix = Array.from({ length: rows + 1 }, () => new Array(cols + 1).fill(0));
    for (let i = 0; i < rows; ++i) {
        for (let j = 0; j < cols; ++j) {
            prefix[i + 1][j + 1] = grid[i][j] + prefix[i][j + 1] + prefix[i + 1][j] - prefix[i][j];
        }
    }
    const rect = (r1, c1, r2, c2) => prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1];
    let best = 0;
    for (let r1 = 0; r1 < rows; ++r1) {
        for (let c1 = 0; c1 < cols; ++c1) {
            const limit = Math.min(rows - r1, cols - c1);
            for (let side = 1; side <= limit; ++side) {
                const r2 = r1 + side - 1,
                    c2 = c1 + side - 1;
                // Each edge is solid iff its cell sum equals its length.
                if (
                    rect(r1, c1, r1, c2) === side &&
                    rect(r2, c1, r2, c2) === side &&
                    rect(r1, c1, r2, c1) === side &&
                    rect(r1, c2, r2, c2) === side
                ) {
                    best = Math.max(best, side * side);
                }
            }
        }
    }
    return best;
};
