/**
 * @param {number[][]} grid
 * @return {number}
 */
var minTotalDistance = function (grid) {
    // A row-major sweep collects the row indexes already sorted; a
    // column-major sweep does the same for the column indexes, so
    // neither axis needs an explicit sort.
    const rows = [];
    const cols = [];
    for (let r = 0; r < grid.length; ++r) {
        for (let c = 0; c < grid[0].length; ++c) {
            if (grid[r][c] === 1) {
                rows.push(r);
            }
        }
    }
    for (let c = 0; c < grid[0].length; ++c) {
        for (let r = 0; r < grid.length; ++r) {
            if (grid[r][c] === 1) {
                cols.push(c);
            }
        }
    }
    // Manhattan distance adds the two axes independently, and on a line a
    // median of the coordinates minimizes the sum of absolute differences
    // — so the answer is the two spreads around the two medians.
    const rowPivot = rows[(rows.length / 2) | 0];
    const colPivot = cols[(cols.length / 2) | 0];
    // With an even count, every index between the two middle ones ties
    // for the minimum; the upper middle is as good as any.
    let total = 0;
    for (const r of rows) {
        total += Math.abs(r - rowPivot);
    }
    for (const c of cols) {
        total += Math.abs(c - colPivot);
    }
    return total;
};
