/**
 * @param {number[]} robot
 * @param {number[][]} factory
 * @return {number}
 */
var minimumTotalDistance = function (robot, factory) {
    const rob = robot.slice().sort((a, b) => a - b);
    const fac = factory.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
    // Optimal plans are non-crossing (triangle inequality), so after
    // sorting, each factory serves a contiguous block of robots in order.
    const n = rob.length;
    const INF = Infinity;
    // dp[i] = min distance to repair the first i robots with the
    // factories processed so far; only i = 0 is reachable initially.
    let dp = new Array(n + 1).fill(INF);
    dp[0] = 0;
    for (const [pos, limit] of fac) {
        // pref[i] = sum of |robot[j] - pos| for j < i: prefix differences
        // give any contiguous block's distance to this factory.
        const pref = [0];
        for (const r of rob) {
            pref.push(pref[pref.length - 1] + Math.abs(r - pos));
        }
        const ndp = dp.slice();
        for (let i = 1; i <= n; i++) {
            // dp[i] carried over = skip this factory (zero assignments).
            let best = dp[i];
            // This factory absorbs the trailing t robots i-t..i-1.
            const maxT = Math.min(limit, i);
            for (let t = 1; t <= maxT; t++) {
                if (dp[i - t] === INF) {
                    continue;
                }
                const val = dp[i - t] + pref[i] - pref[i - t];
                if (val < best) {
                    best = val;
                }
            }
            ndp[i] = best;
        }
        dp = ndp;
    }
    return dp[n];
};
