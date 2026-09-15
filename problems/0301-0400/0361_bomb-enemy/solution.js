/**
 * @param {string[][]} grid
 * @return {number}
 */
var maxKilledEnemies = function (grid) {
    // A bomb planted on an empty cell kills along its row and column
    // until a wall, so its reach is the two wall-free segments crossing
    // the cell. Every empty cell in a segment shares that segment's
    // enemies: count each segment once and reuse the count.
    const m = grid.length;
    const n = grid[0].length;
    const colHits = new Array(n).fill(0);
    // Enemies in row i from column j up to the next wall.
    const countRow = (i, j) => {
        let hits = 0;
        for (let k = j; k < n && grid[i][k] !== "W"; k++) {
            if (grid[i][k] === "E") hits++;
        }
        return hits;
    };
    // Enemies in column j from row i down to the next wall.
    const countCol = (i, j) => {
        let hits = 0;
        for (let k = i; k < m && grid[k][j] !== "W"; k++) {
            if (grid[k][j] === "E") hits++;
        }
        return hits;
    };
    let best = 0;
    for (let i = 0; i < m; i++) {
        let rowHits = 0;
        for (let j = 0; j < n; j++) {
            // First cell of a row segment (after a wall or at the left
            // edge): one scan counts the enemies up to the next wall.
            if (j === 0 || grid[i][j - 1] === "W") {
                rowHits = countRow(i, j);
            }
            // Same lazily per column: recount only when the cell above is
            // a wall or the top edge.
            if (i === 0 || grid[i - 1][j] === "W") {
                colHits[j] = countCol(i, j);
            }
            if (grid[i][j] === "0") {
                best = Math.max(best, rowHits + colHits[j]);
            }
        }
    }
    return best;
};
