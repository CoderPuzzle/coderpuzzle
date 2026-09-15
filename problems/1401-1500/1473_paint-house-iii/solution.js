/**
 * @param {number[]} houses
 * @param {number[][]} cost
 * @param {number} m
 * @param {number} n
 * @param {number} target
 * @return {number}
 */
var minCost = function (houses, cost, m, n, target) {
    const INF = Number.MAX_SAFE_INTEGER;
    let dp = Array.from({ length: n + 1 }, () => new Array(target + 1).fill(INF));
    if (houses[0] !== 0) {
        dp[houses[0]][1] = 0;
    } else {
        for (let j = 1; j <= n; j++) {
            dp[j][1] = cost[0][j - 1];
        }
    }
    for (let i = 1; i < m; i++) {
        const ndp = Array.from({ length: n + 1 }, () => new Array(target + 1).fill(INF));
        for (let j = 1; j <= n; j++) {
            if (houses[i] !== 0 && houses[i] !== j) {
                continue;
            }
            const cj = houses[i] !== 0 ? 0 : cost[i][j - 1];
            for (let pj = 1; pj <= n; pj++) {
                for (let k = 1; k <= target; k++) {
                    if (dp[pj][k] === INF) {
                        continue;
                    }
                    const nk = pj === j ? k : k + 1;
                    if (nk <= target && dp[pj][k] + cj < ndp[j][nk]) {
                        ndp[j][nk] = dp[pj][k] + cj;
                    }
                }
            }
        }
        dp = ndp;
    }
    let best = INF;
    for (let j = 1; j <= n; j++) {
        best = Math.min(best, dp[j][target]);
    }
    return best >= INF ? -1 : best;
};
