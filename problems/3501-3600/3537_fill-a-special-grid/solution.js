/**
 * @param {number} n
 * @return {number[][]}
 */
var specialGrid = function (n) {
    // Bottom-up quadrant doubling. A special grid of level k is, in
    // reading order of the conditions, TL = 3·4^(k-1) + G(k-1) on the left
    // of the top half, TR = G(k-1) on the right, BL and BR follow in the
    // bottom half — so each step rebuilds every row of G(k-1) into one
    // top-half row and one bottom-half row, the top halves grouped before
    // the bottom halves.
    let grid = [[0]];
    let step = 1;
    for (let level = 0; level < n; ++level) {
        const halfCount = grid.length;
        const next = new Array(2 * halfCount);
        for (let index = 0; index < halfCount; ++index) {
            const row = grid[index];
            next[index] = row.map((value) => value + 3 * step).concat(row);
            next[halfCount + index] = row.map((value) => value + 2 * step).concat(row.map((value) => value + step));
        }
        grid = next;
        step *= 4;
    }
    return grid;
};
