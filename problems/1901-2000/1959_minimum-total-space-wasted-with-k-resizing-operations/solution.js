/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minSpaceWastedKResizing = function (nums, k) {
    const n = nums.length;
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }
    // g[i][j] = waste if a single allocation covers nums[i..j]
    const g = Array.from({ length: n }, () => new Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        let mx = 0;
        for (let j = i; j < n; j++) {
            if (nums[j] > mx) mx = nums[j];
            g[i][j] = mx * (j - i + 1) - (prefix[j + 1] - prefix[i]);
        }
    }
    const INF = Infinity;
    // dp[j][i] = min waste for suffix starting at i using j segments
    const dp = Array.from({ length: k + 2 }, () => new Array(n + 1).fill(INF));
    dp[0][n] = 0;
    for (let j = 1; j < k + 2; j++) {
        for (let i = n - 1; i >= 0; i--) {
            let best = INF;
            for (let t = i; t < n; t++) {
                if (dp[j - 1][t + 1] < INF) {
                    const cand = g[i][t] + dp[j - 1][t + 1];
                    if (cand < best) best = cand;
                }
            }
            dp[j][i] = best;
        }
    }
    return dp[k + 1][0];
};
