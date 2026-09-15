/**
 * @param {number[][]} board
 * @return {number[][]}
 */
var gameOfLife = function (board) {
    const m = board.length;
    const n = board[0].length;
    // Snapshot the current generation: every neighbor count must read the
    // old states even while the board itself is being overwritten.
    const snapshot = board.map((row) => row.slice());
    const dirs = [
        [-1, -1],
        [-1, 0],
        [-1, 1],
        [0, -1],
        [0, 1],
        [1, -1],
        [1, 0],
        [1, 1],
    ];
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            let live = 0;
            // Count live neighbors in the snapshot; cells outside the board
            // count as dead via the bounds check.
            for (const [dr, dc] of dirs) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && snapshot[nr][nc] === 1) {
                    live++;
                }
            }
            // Rules applied to the old state: live survives on 2 or 3,
            // dead is born on exactly 3, everything else dies/stays dead.
            if (snapshot[r][c] === 1) {
                board[r][c] = live === 2 || live === 3 ? 1 : 0;
            } else {
                board[r][c] = live === 3 ? 1 : 0;
            }
        }
    }
    return board;
};
