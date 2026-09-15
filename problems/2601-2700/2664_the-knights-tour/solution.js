/**
 * @param {number} m
 * @param {number} n
 * @param {number} r
 * @param {number} c
 * @return {number[][]}
 */
var tourOfKnight = function (m, n, r, c) {
    const moves = [
        [1, 2],
        [2, 1],
        [2, -1],
        [1, -2],
        [-1, -2],
        [-2, -1],
        [-2, 1],
        [-1, 2],
    ];
    const board = Array.from({ length: m }, () => Array(n).fill(-1));
    board[r][c] = 0;
    const onward = (row, col) => {
        let count = 0;
        for (const [dr, dc] of moves) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] === -1) {
                count++;
            }
        }
        return count;
    };
    const walk = (row, col, order) => {
        if (order === m * n) {
            return true;
        }
        const choices = [];
        for (const [dr, dc] of moves) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] === -1) {
                choices.push([onward(nr, nc), nr, nc]);
            }
        }
        choices.sort((a, b) => a[0] - b[0]);
        for (const [, nr, nc] of choices) {
            board[nr][nc] = order;
            if (walk(nr, nc, order + 1)) {
                return true;
            }
            board[nr][nc] = -1;
        }
        return false;
    };
    walk(r, c, 1);
    return board;
};
