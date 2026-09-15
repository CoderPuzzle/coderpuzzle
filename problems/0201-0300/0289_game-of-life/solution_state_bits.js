/**
 * @param {number[][]} board
 * @return {number[][]}
 */
var gameOfLife = function (board) {
    const m = board.length;
    const n = board[0].length;
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
            for (const [dr, dc] of dirs) {
                const nr = r + dr;
                const nc = c + dc;
                if (nr >= 0 && nr < m && nc >= 0 && nc < n && (board[nr][nc] === 1 || board[nr][nc] === 2)) {
                    live++;
                }
            }
            if (board[r][c] === 1 && (live < 2 || live > 3)) {
                board[r][c] = 2; // live -> dead
            } else if (board[r][c] === 0 && live === 3) {
                board[r][c] = 3; // dead -> live
            }
        }
    }
    for (let r = 0; r < m; r++) {
        for (let c = 0; c < n; c++) {
            board[r][c] = board[r][c] === 1 || board[r][c] === 3 ? 1 : 0;
        }
    }
    return board;
};
