/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumOperations = function (grid) {
    // Columns are independent: a cell only has to top the cell directly
    // above it, so one top-to-bottom sweep settles everything. Raising
    // each cell to exactly one above the cell above is the pointwise
    // minimum final column, so no cheaper fix exists.
    const previous = grid[0].slice();
    let operations = 0;
    for (let i = 1; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] <= previous[j]) {
                operations += previous[j] + 1 - grid[i][j];
                previous[j] += 1;
            } else {
                previous[j] = grid[i][j];
            }
        }
    }
    return operations;
};
