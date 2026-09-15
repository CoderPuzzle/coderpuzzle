/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    let total = 0;
    for (const v of nums) total += v;
    // An odd total cannot split into two equal halves.
    if (total % 2 !== 0) return false;
    const target = total / 2;
    // dp[s]: some subset of the numbers processed so far sums to s.
    const dp = new Array(target + 1).fill(false);
    dp[0] = true;
    for (const v of nums) {
        // Sweep sums downward so v is used at most once (0/1 knapsack).
        for (let j = target; j >= v; j--) {
            if (dp[j - v]) dp[j] = true;
        }
        // Target reachable: the complement subset completes the split.
        if (dp[target]) return true;
    }
    return dp[target];
};
