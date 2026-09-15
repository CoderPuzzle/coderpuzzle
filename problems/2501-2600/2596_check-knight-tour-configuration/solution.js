/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var checkValidGrid = function (grid) {
    // The configuration is valid exactly when visit 0 sits at the
    // top-left cell and every pair of consecutive visits lands a
    // knight move apart. Map each visit number to its cell, then
    // verify the deltas pairwise with the arithmetic move test
    // (one step in one axis, two steps in the other).
    if (grid[0][0] !== 0) return false;
    const n = grid.length;
    const pos = new Array(n * n);
    for (let r = 0; r < n; r++) {
        for (let c = 0; c < n; c++) {
            pos[grid[r][c]] = [r, c];
        }
    }
    for (let step = 1; step < n * n; step++) {
        const dr = Math.abs(pos[step][0] - pos[step - 1][0]);
        const dc = Math.abs(pos[step][1] - pos[step - 1][1]);
        if ((dr !== 1 || dc !== 2) && (dr !== 2 || dc !== 1)) return false;
    }
    return true;
};
