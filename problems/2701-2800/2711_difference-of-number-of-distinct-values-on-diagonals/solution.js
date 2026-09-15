/**
 * @param {number[][]} grid
 * @return {number[][]}
 */
var differenceOfDistinctValues = function (grid) {
    // Each main diagonal is swept once downward and once upward. The
    // downward pass records, per cell, how many distinct values lie
    // strictly left-above (the running set size before inserting the
    // cell itself); the upward pass rebuilds the same count for
    // right-below and combines the two.
    const m = grid.length;
    const n = grid[0].length;
    const ans = Array.from({ length: m }, () => new Array(n).fill(0));
    const starts = [];
    for (let r = 0; r < m; ++r) starts.push([r, 0]);
    for (let c = 1; c < n; ++c) starts.push([0, c]);
    for (const [sr, sc] of starts) {
        const leftAbove = new Set();
        let length = 0;
        let r = sr;
        let c = sc;
        while (r < m && c < n) {
            ans[r][c] = leftAbove.size;
            leftAbove.add(grid[r][c]);
            ++length;
            ++r;
            ++c;
        }
        const rightBelow = new Set();
        for (let k = length - 1; k >= 0; --k) {
            const x = sr + k;
            const y = sc + k;
            ans[x][y] = Math.abs(ans[x][y] - rightBelow.size);
            rightBelow.add(grid[x][y]);
        }
    }
    return ans;
};
