/**
 * @param {number[][]} grid
 * @return {boolean}
 */
var isThereAPath = function (grid) {
    // Monotone moves give cell (i, j) exactly i + j + 1 visited cells,
    // so every balance (#1s - #0s) reachable there lies inside
    // [-(m+n-1), m+n-1]. Carry one bigint bitmask per column whose bit b
    // marks a reachable balance of b at the current row (the window has
    // up to 399 bits, far past Number precision); a cell unions the
    // masks of its top and left neighbours and shifts the set by its own
    // value (+1 or -1). The answer is whether balance 0 survives at the
    // bottom-right corner.
    const m = grid.length;
    const n = grid[0].length;
    const half = m + n - 1;
    const cols = new Array(n).fill(0n);
    cols[0] = 1n << BigInt(half + (grid[0][0] === 1 ? 1 : -1));
    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (i === 0 && j === 0) continue;
            const reachable = (i > 0 ? cols[j] : 0n) | (j > 0 ? cols[j - 1] : 0n);
            cols[j] = grid[i][j] === 1 ? reachable << 1n : reachable >> 1n;
        }
    }
    return ((cols[n - 1] >> BigInt(half)) & 1n) === 1n;
};
