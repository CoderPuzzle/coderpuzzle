/**
 * @param {number[][]} grid
 * @return {number}
 */
var countServers = function (grid) {
    // A server communicates iff its row or its column holds another
    // server — any communicating partner must share one of those lines,
    // so tallies per line settle it without searching the pair graph.
    const m = grid.length,
        n = grid[0].length;
    const row = new Array(m).fill(0);
    const col = new Array(n).fill(0);
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            if (grid[r][c] === 1) {
                row[r] += 1;
                col[c] += 1;
            }
        }
    }
    let total = 0;
    for (let r = 0; r < m; ++r) {
        for (let c = 0; c < n; ++c) {
            if (grid[r][c] === 1 && (row[r] > 1 || col[c] > 1)) {
                total += 1;
            }
        }
    }
    return total;
};
