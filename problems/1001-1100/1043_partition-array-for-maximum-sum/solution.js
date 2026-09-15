/**
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var maxSumAfterPartitioning = function (arr, k) {
    const n = arr.length;
    const dp = new Array(n + 1).fill(0);
    for (let i = 1; i <= n; i++) {
        let best = 0;
        let runningMax = 0;
        const limit = Math.min(k, i);
        for (let j = 1; j <= limit; j++) {
            if (arr[i - j] > runningMax) {
                runningMax = arr[i - j];
            }
            const candidate = dp[i - j] + runningMax * j;
            if (candidate > best) {
                best = candidate;
            }
        }
        dp[i] = best;
    }
    return dp[n];
};
