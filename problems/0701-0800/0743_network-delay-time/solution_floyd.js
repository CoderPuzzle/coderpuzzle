/**
 * @param {number[][]} times
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
var networkDelayTime = function (times, n, k) {
    const INF = Infinity;
    const d = Array.from({ length: n + 1 }, () => new Array(n + 1).fill(INF));
    for (let i = 1; i <= n; i++) d[i][i] = 0;
    for (const [u, v, w] of times) {
        if (w < d[u][v]) d[u][v] = w; // keep the smallest parallel-edge weight
    }
    // Relax every path through each midpoint m: one shot gives all pairs.
    for (let m = 1; m <= n; m++) {
        for (let i = 1; i <= n; i++) {
            for (let j = 1; j <= n; j++) {
                if (d[i][m] + d[m][j] < d[i][j]) d[i][j] = d[i][m] + d[m][j];
            }
        }
    }
    let best = 0;
    for (let j = 1; j <= n; j++) {
        // Anything still Infinity in row k is unreachable from the source.
        if (d[k][j] === INF) return -1;
        if (d[k][j] > best) best = d[k][j];
    }
    return best;
};
