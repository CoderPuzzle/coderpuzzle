/**
 * @param {number} kx
 * @param {number} ky
 * @param {number[][]} positions
 * @return {number}
 */
const KNIGHT_MOVES = [
    [-2, -1],
    [-2, 1],
    [-1, -2],
    [-1, 2],
    [1, -2],
    [1, 2],
    [2, -1],
    [2, 1],
];

function knightDistances(sx, sy) {
    // BFS: minimum knight moves from (sx, sy) to every square.
    const dist = Array.from({ length: 50 }, () => new Array(50).fill(-1));
    dist[sx][sy] = 0;
    const queue = [[sx, sy]];
    let head = 0;
    while (head < queue.length) {
        const [x, y] = queue[head++];
        const d = dist[x][y];
        for (const [dx, dy] of KNIGHT_MOVES) {
            const nx = x + dx,
                ny = y + dy;
            if (nx >= 0 && nx < 50 && ny >= 0 && ny < 50 && dist[nx][ny] < 0) {
                dist[nx][ny] = d + 1;
                queue.push([nx, ny]);
            }
        }
    }
    return dist;
}

var maxMoves = function (kx, ky, positions) {
    const m = positions.length;
    const grids = positions.map(([x, y]) => knightDistances(x, y));
    const dStart = grids.map((g) => g[kx][ky]);
    const dist = Array.from({ length: m }, (_, i) => grids.map((g) => g[positions[i][0]][positions[i][1]]));

    const full = (1 << m) - 1;
    // dp[mask][last]: best total remaining moves with `mask` captured and the
    // knight on pawn `last`. Alice maximizes on even popcount.
    const dp = Array.from({ length: full + 1 }, () => new Array(m).fill(0));
    for (let mask = full - 1; mask >= 1; mask--) {
        let bits = 0;
        for (let b = 0; b < m; b++) {
            if (mask & (1 << b)) bits++;
        }
        const maximize = bits % 2 === 0;
        for (let last = 0; last < m; last++) {
            let best = maximize ? -1 : Infinity;
            for (let j = 0; j < m; j++) {
                if (mask & (1 << j)) continue;
                const cand = dist[last][j] + dp[mask | (1 << j)][j];
                if (maximize) {
                    if (cand > best) best = cand;
                } else {
                    if (cand < best) best = cand;
                }
            }
            dp[mask][last] = best;
        }
    }

    let best = -1;
    for (let j = 0; j < m; j++) {
        const cand = dStart[j] + dp[1 << j][j];
        if (cand > best) best = cand;
    }
    return best;
};
