/**
 * @param {number} n
 * @param {number[][]} cost
 * @return {number}
 */
var minCost = function (n, cost) {
    // Paint equidistant pairs (k, n-1-k) outside-in. dp[a][b] is the
    // cheapest way to paint every pair so far, ending with outer colors
    // (a, b) — 9 states, because a pair only constrains the two houses
    // it touches in the next pair. Totals reach 10^10 < 2^53, so Number
    // arithmetic stays exact.
    const INF = Infinity;
    let dp = [
        [INF, cost[0][0] + cost[n - 1][1], cost[0][0] + cost[n - 1][2]],
        [cost[0][1] + cost[n - 1][0], INF, cost[0][1] + cost[n - 1][2]],
        [cost[0][2] + cost[n - 1][0], cost[0][2] + cost[n - 1][1], INF],
    ];
    for (let k = 1; k < Math.floor(n / 2); k++) {
        const left = cost[k];
        const right = cost[n - 1 - k];
        // e[t][c]: best dp[t][b] over b != c — the previous right house
        // must differ from the new right one (adjacency on that side)
        const e = [
            [Math.min(dp[0][1], dp[0][2]), Math.min(dp[0][0], dp[0][2]), Math.min(dp[0][0], dp[0][1])],
            [Math.min(dp[1][1], dp[1][2]), Math.min(dp[1][0], dp[1][2]), Math.min(dp[1][0], dp[1][1])],
            [Math.min(dp[2][1], dp[2][2]), Math.min(dp[2][0], dp[2][2]), Math.min(dp[2][0], dp[2][1])],
        ];
        // the diagonal stays unreachable: a pair's two houses are mirrors
        // of each other and may not share a color; each column drops one
        // left color so the new left house differs from the old one
        dp = [
            [INF, left[0] + right[1] + Math.min(e[1][1], e[2][1]), left[0] + right[2] + Math.min(e[1][2], e[2][2])],
            [left[1] + right[0] + Math.min(e[0][0], e[2][0]), INF, left[1] + right[2] + Math.min(e[0][2], e[2][2])],
            [left[2] + right[0] + Math.min(e[0][0], e[1][0]), left[2] + right[1] + Math.min(e[0][1], e[1][1]), INF],
        ];
    }
    return Math.min(...dp.map((row) => Math.min(...row)));
};
