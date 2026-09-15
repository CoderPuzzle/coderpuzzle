/**
 * @param {string[]} board
 * @return {number[]}
 */
var pathsWithMaxScore = function (board) {
    const MOD = 1000000007;
    const n = board.length;
    // score[i][j] is the best sum reachable at (i, j) from 'S', and
    // ways[i][j] counts the paths achieving it; -1 marks unreachable.
    const score = Array.from({ length: n }, () => Array(n).fill(-1));
    const ways = Array.from({ length: n }, () => Array(n).fill(0));
    score[n - 1][n - 1] = 0;
    ways[n - 1][n - 1] = 1;
    const dirs = [
        [1, 0],
        [0, 1],
        [1, 1],
    ];
    // Sweep bottom-up so every incoming cell (below, right, below-right) is
    // already resolved when a cell is visited. The start square is seeded
    // above and skipped here.
    for (let i = n - 1; i >= 0; --i) {
        for (let j = n - 1; j >= 0; --j) {
            if (board[i][j] === "X" || (i === n - 1 && j === n - 1)) {
                continue;
            }
            let best = -1;
            let total = 0;
            for (const [di, dj] of dirs) {
                const ni = i + di;
                const nj = j + dj;
                if (ni >= n || nj >= n || score[ni][nj] < 0) {
                    continue;
                }
                if (score[ni][nj] > best) {
                    best = score[ni][nj];
                    total = ways[ni][nj];
                } else if (score[ni][nj] === best) {
                    total = (total + ways[ni][nj]) % MOD;
                }
            }
            if (best >= 0) {
                const digit = board[i][j] >= "1" && board[i][j] <= "9" ? Number(board[i][j]) : 0;
                score[i][j] = best + digit;
                ways[i][j] = total % MOD;
            }
        }
    }
    if (ways[0][0] === 0) {
        return [0, 0];
    }
    return [score[0][0], ways[0][0]];
};
