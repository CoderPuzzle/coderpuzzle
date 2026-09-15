/**
 * @param {number} n
 * @param {number} k
 * @param {number} row
 * @param {number} column
 * @return {number}
 */
var knightProbability = function (n, k, row, column) {
    // Probability-mass DP over the board. board[r][c] is the probability
    // of standing on (r, c) after the moves made so far; one gather sweep
    // advances it by one move, and mass addressed off the board is lost.
    const moves = [
        [-2, -1],
        [-2, 1],
        [-1, -2],
        [-1, 2],
        [1, -2],
        [1, 2],
        [2, -1],
        [2, 1],
    ];
    let board = Array.from({ length: n }, () => new Array(n).fill(0.0));
    board[row][column] = 1.0;
    for (let step = 0; step < k; ++step) {
        const next = Array.from({ length: n }, () => new Array(n).fill(0.0));
        for (let r = 0; r < n; ++r) {
            for (let c = 0; c < n; ++c) {
                let mass = 0.0;
                for (const [dr, dc] of moves) {
                    const nr = r + dr;
                    const nc = c + dc;
                    if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                        mass += board[nr][nc] / 8.0;
                    }
                }
                next[r][c] = mass;
            }
        }
        board = next;
    }
    let total = 0.0;
    for (let r = 0; r < n; ++r) {
        for (let c = 0; c < n; ++c) {
            total += board[r][c];
        }
    }
    return total;
};
