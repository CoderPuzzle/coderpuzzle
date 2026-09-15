/**
 * @param {number[][]} grid
 * @return {number[]}
 */
var goodSubsetofBinaryMatrix = function (grid) {
    // Each row collapses into an n-bit signature (n <= 5 means at most
    // 32 of them). An all-zero row by itself is a good subset; otherwise
    // the earliest previously stored signature disjoint from the current
    // row completes a size-2 good subset.
    const seen = new Map();
    for (let i = 0; i < grid.length; ++i) {
        let mask = 0;
        for (let j = 0; j < grid[i].length; ++j) {
            if (grid[i][j] === 1) mask |= 1 << j;
        }
        if (mask === 0) return [i];
        for (let other = 0; other < 32; ++other) {
            if (seen.has(other) && (other & mask) === 0) {
                return [seen.get(other), i];
            }
        }
        if (!seen.has(mask)) seen.set(mask, i);
    }
    return [];
};
