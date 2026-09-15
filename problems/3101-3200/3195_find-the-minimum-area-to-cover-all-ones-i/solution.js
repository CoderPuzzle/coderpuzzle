/**
 * @param {number[][]} grid
 * @return {number}
 */
var minimumArea = function (grid) {
    // Every 1 must lie inside the answer, so the rectangle is pinned to the
    // topmost, bottommost, leftmost and rightmost 1; any smaller box would
    // exclude one of those extreme cells. One sweep tracking the four
    // extremes, jumping across each row via index lookups, is enough.
    let minRow = grid.length;
    let maxRow = -1;
    let minCol = grid[0].length;
    let maxCol = -1;
    for (let i = 0; i < grid.length; ++i) {
        const row = grid[i];
        if (!row.includes(1)) continue;
        if (i < minRow) minRow = i;
        maxRow = i;
        const first = row.indexOf(1);
        const last = row.lastIndexOf(1);
        if (first < minCol) minCol = first;
        if (last > maxCol) maxCol = last;
    }
    return (maxRow - minRow + 1) * (maxCol - minCol + 1);
};
