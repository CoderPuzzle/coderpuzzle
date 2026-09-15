/**
 * @param {number[][]} cost
 * @return {number}
 */
var connectTwoGroups = function (cost) {
    const size1 = cost.length;
    const size2 = cost[0].length;
    const full = 1 << size2;
    const INF = 1_000_000;

    // minToReach[j]: cheapest single edge that reaches second-group point j
    // from ANY first-group point, used to force coverage of whichever
    // second-group points the forward pass leaves untouched.
    const minToReach = new Array(size2).fill(INF);
    for (let j = 0; j < size2; ++j) {
        for (let i = 0; i < size1; ++i) {
            if (cost[i][j] < minToReach[j]) minToReach[j] = cost[i][j];
        }
    }

    // dp[mask]: cheapest way to finish connecting everything once the
    // first-group points placed so far have reached exactly `mask`.
    let dp = new Array(full).fill(0);
    for (let mask = 0; mask < full; ++mask) {
        let total = 0;
        for (let j = 0; j < size2; ++j) {
            if (((mask >> j) & 1) === 0) total += minToReach[j];
        }
        dp[mask] = total;
    }

    for (let i = size1 - 1; i >= 0; --i) {
        const next = new Array(full).fill(INF);
        for (let mask = 0; mask < full; ++mask) {
            let best = INF;
            for (let j = 0; j < size2; ++j) {
                const candidate = cost[i][j] + dp[mask | (1 << j)];
                if (candidate < best) best = candidate;
            }
            next[mask] = best;
        }
        dp = next;
    }

    return dp[0];
};
