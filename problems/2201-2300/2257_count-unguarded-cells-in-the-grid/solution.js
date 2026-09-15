/**
 * @param {number} m
 * @param {number} n
 * @param {number[][]} guards
 * @param {number[][]} walls
 * @return {number}
 */
var countUnguarded = function (m, n, guards, walls) {
    const WALL = 1,
        GUARD = 2,
        GUARDED = 3;
    const grid = Array.from({ length: m }, () => new Array(n).fill(0));
    for (const [r, c] of walls) {
        grid[r][c] = WALL;
    }
    for (const [r, c] of guards) {
        grid[r][c] = GUARD;
    }
    for (const [gr, gc] of guards) {
        for (const [dr, dc] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1],
        ]) {
            let row = gr + dr,
                col = gc + dc;
            while (row >= 0 && row < m && col >= 0 && col < n && grid[row][col] !== WALL && grid[row][col] !== GUARD) {
                grid[row][col] = GUARDED;
                row += dr;
                col += dc;
            }
        }
    }
    let count = 0;
    for (const row of grid) {
        for (const cell of row) {
            if (cell === 0) {
                count++;
            }
        }
    }
    return count;
};
