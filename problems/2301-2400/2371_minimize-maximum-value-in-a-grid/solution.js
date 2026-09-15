/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var minScore = function (grid) {
    const m = grid.length,
        n = grid[0].length;
    const cells = [];
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            cells.push([grid[r][c], r, c]);
        }
    }
    cells.sort((a, b) => a[0] - b[0] || a[1] - b[1] || a[2] - b[2]);
    // Assign in ascending original order: when a cell's turn comes, every
    // smaller cell sharing its row/column is already placed, so only the
    // running maxima of that row and column constrain it.
    const rowMax = new Array(m).fill(0);
    const colMax = new Array(n).fill(0);
    const res = Array.from({ length: m }, () => new Array(n).fill(0));
    for (const cell of cells) {
        const r = cell[1],
            c = cell[2];
        // Smallest legal replacement: 1 + max of what's already in the
        // row/column; larger demands come only from unplaced cells, which
        // receive strictly larger values later by construction.
        const v = 1 + Math.max(rowMax[r], colMax[c]);
        res[r][c] = v;
        rowMax[r] = v;
        colMax[c] = v;
    }
    return res;
};
