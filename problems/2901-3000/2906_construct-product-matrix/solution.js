/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var constructProductMatrix = function (grid) {
    // Division is unavailable: 12345 = 3 * 5 * 823 is composite and grid
    // values routinely share factors with it, so there is no modular
    // inverse to divide by. Flatten the matrix in row-major order —
    // excluding grid[i][j] is excluding one position of that sequence —
    // and multiply the prefix (everything before the position) by the
    // suffix (everything after it). Reducing after every multiply keeps
    // every factor below 12345, so intermediates stay below 12345^2 and
    // far inside the exact double range.
    const MOD = 12345;
    const n = grid.length;
    const m = grid[0].length;
    const flat = [];
    for (const row of grid) {
        for (const v of row) {
            flat.push(v % MOD);
        }
    }
    const total = flat.length;
    const prefix = new Array(total + 1).fill(1);
    const suffix = new Array(total + 1).fill(1);
    for (let k = 0; k < total; k++) {
        prefix[k + 1] = (prefix[k] * flat[k]) % MOD;
        suffix[total - 1 - k] = (suffix[total - k] * flat[total - 1 - k]) % MOD;
    }
    const result = Array.from({ length: n }, () => new Array(m).fill(0));
    let k = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < m; j++) {
            result[i][j] = (prefix[k] * suffix[k + 1]) % MOD;
            k++;
        }
    }
    return result;
};
