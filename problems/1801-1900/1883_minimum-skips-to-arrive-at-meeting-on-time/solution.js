/**
 * @param {number[]} dist
 * @param {number} speed
 * @param {number} hoursBefore
 * @return {number}
 */
var minSkips = function (dist, speed, hoursBefore) {
    // dp[j] = smallest accumulated time (in distance units) after the
    // current road with j skips used; rests already rounded. Rest:
    // ceil((t+d)/speed)*speed at same j; skip: t+d at j+1. Values stay
    // below 2^53 for these limits, so plain numbers are exact.
    const INF = Infinity;
    const n = dist.length;
    const dp = new Array(n + 1).fill(INF);
    dp[0] = 0;
    for (let i = 0; i < n; i++) {
        const d = dist[i];
        const ndp = new Array(n + 1).fill(INF);
        if (i === n - 1) {
            for (let j = 0; j <= n; j++) {
                if (dp[j] !== INF && dp[j] + d < ndp[j]) {
                    ndp[j] = dp[j] + d;
                }
            }
        } else {
            for (let j = 0; j < n; j++) {
                const t = dp[j];
                if (t === INF) {
                    continue;
                }
                const arr = t + d;
                if (arr < ndp[j + 1]) {
                    ndp[j + 1] = arr;
                }
                const rested = Math.ceil(arr / speed) * speed;
                if (rested < ndp[j]) {
                    ndp[j] = rested;
                }
            }
        }
        for (let j = 0; j <= n; j++) {
            dp[j] = ndp[j];
        }
    }
    const limit = hoursBefore * speed;
    for (let j = 0; j <= n; j++) {
        if (dp[j] !== INF && dp[j] <= limit) {
            return j;
        }
    }
    return -1;
};
