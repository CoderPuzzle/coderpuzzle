/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxScore = function (grid) {
    // Scores telescope: however many intermediate hops a journey
    // takes, its total is simply end - start. So only the endpoint
    // pair matters, and the end must sit strictly below or to the
    // right of the start (componentwise). A row-major sweep carries
    // prefix[r][c], the smallest value in the rectangle on or
    // above-left of (r, c); strip the cell itself from that rectangle
    // and what remains is exactly its legal start set, split as "row
    // above" plus "running minimum to the left". Every value and every
    // difference stays <= 1e5 - 1, far below 2^53, so Number is exact.
    const m = grid.length;
    const n = grid[0].length;
    const prefix = Array.from({ length: m }, () => new Array(n).fill(0));
    let best = -Infinity;
    for (let r = 0; r < m; r++) {
        let rowRunning = Infinity;
        for (let c = 0; c < n; c++) {
            const above = r > 0 ? prefix[r - 1][c] : Infinity;
            const startVal = Math.min(above, rowRunning);
            best = Math.max(best, grid[r][c] - startVal);
            rowRunning = Math.min(rowRunning, grid[r][c]);
            prefix[r][c] = Math.min(startVal, grid[r][c]);
        }
    }
    return best;
};
