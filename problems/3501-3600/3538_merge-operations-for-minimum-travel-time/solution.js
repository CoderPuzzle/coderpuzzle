/**
 * @param {number} l
 * @param {number} n
 * @param {number} k
 * @param {number[]} position
 * @param {number[]} time
 * @return {number}
 */
var minTravelTime = function (l, n, k, position, time) {
    const INF = Infinity;
    // prefix[t] = sum of time[0..t-1]; merging a run of s removals that sit
    // directly before kept sign i folds time[i-s..i] into its rate. Every
    // dp value stays <= l * sum(time) <= 1e5 * 100 = 1e7, far below the
    // 2^53 exact-Number bound.
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; ++i) prefix[i + 1] = prefix[i] + time[i];
    // dp[i][j][s]: sign i kept, j merges spent, s consecutive removals
    // directly before i; the outgoing segment (i -> next kept) is charged
    // when the transition is relaxed.
    const dp = Array.from({ length: n }, () => Array.from({ length: k + 1 }, () => new Array(k + 1).fill(INF)));
    dp[0][0][0] = 0;
    for (let i = 0; i < n; ++i) {
        for (let j = 0; j <= k; ++j) {
            for (let s = 0; s <= k; ++s) {
                const base = dp[i][j][s];
                if (base === INF) continue;
                const rate = prefix[i + 1] - prefix[i - s];
                for (let q = i + 1; q < n; ++q) {
                    const d = q - i - 1;
                    if (j + d > k) break;
                    const cost = base + (position[q] - position[i]) * rate;
                    if (cost < dp[q][j + d][d]) dp[q][j + d][d] = cost;
                }
            }
        }
    }
    let best = INF;
    for (let s = 0; s <= k; ++s) best = Math.min(best, dp[n - 1][k][s]);
    return best;
};
