/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var canPartitionGrid = function (grid) {
    // One cut splits the grid into a run of whole rows or whole columns,
    // so scan run-prefix sums for total / 2. Totals reach 1e5 cells x
    // 1e5 = 1e10 — well under 2^53, so Number arithmetic stays exact.
    let total = 0;
    for (const row of grid) {
        for (const v of row) total += v;
    }
    if (total % 2) return false;
    const half = total / 2;
    let prefix = 0;
    for (let r = 0; r < grid.length - 1; r++) {
        for (const v of grid[r]) prefix += v;
        if (prefix === half) return true;
    }
    prefix = 0;
    for (let c = 0; c < grid[0].length - 1; c++) {
        for (const row of grid) prefix += row[c];
        if (prefix === half) return true;
    }
    return false;
};
