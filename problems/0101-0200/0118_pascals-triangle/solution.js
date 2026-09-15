/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function (numRows) {
    // The triangle defines its own recurrence: row 0 is a lone 1, and every
    // later row carries a 1 at each end with each interior cell the sum of
    // the two cells directly above it. Building top-down means the row
    // above is already complete when any of its sums are read.
    const rows = [[1]];
    for (let i = 1; i < numRows; ++i) {
        const above = rows[i - 1];
        const row = [1];
        // Interior cell j is above[j - 1] + above[j]: the two cells that
        // touch it from directly above, with the edge 1s supplying the
        // missing neighbors of the outermost interior cells.
        for (let j = 1; j < i; ++j) {
            row.push(above[j - 1] + above[j]);
        }
        row.push(1);
        rows.push(row);
    }
    return rows;
};
