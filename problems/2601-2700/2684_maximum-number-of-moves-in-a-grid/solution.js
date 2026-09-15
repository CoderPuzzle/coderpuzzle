/**
 * @param {number[][]} grid
 * @return {number}
 */
var maxMoves = function (grid) {
    const rows = grid.length;
    const columns = grid[0].length;
    let reachable = new Array(rows).fill(true);
    let moves = 0;
    for (let column = 0; column + 1 < columns; column++) {
        const next = new Array(rows).fill(false);
        for (let row = 0; row < rows; row++) {
            if (!reachable[row]) {
                continue;
            }
            const value = grid[row][column];
            for (let target = Math.max(0, row - 1); target < Math.min(rows, row + 2); target++) {
                if (!next[target] && grid[target][column + 1] > value) {
                    next[target] = true;
                }
            }
        }
        if (!next.includes(true)) {
            break;
        }
        reachable = next;
        moves++;
    }
    return moves;
};
