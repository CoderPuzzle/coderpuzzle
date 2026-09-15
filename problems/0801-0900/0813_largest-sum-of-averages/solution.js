/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var largestSumOfAverages = function (nums, k) {
    const n = nums.length;
    const prefix = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + nums[i];
    }

    // dp[i] = best(i, groups) for the current group count.
    // groups == 1: the whole remaining suffix is one group.
    let dp = new Array(n);
    for (let i = 0; i < n; i++) {
        dp[i] = (prefix[n] - prefix[i]) / (n - i);
    }

    for (let groups = 2; groups <= k; groups++) {
        const ndp = new Array(n).fill(0.0);
        for (let i = 0; i <= n - groups; i++) {
            let result = 0.0;
            for (let j = i + 1; j <= n - groups + 1; j++) {
                result = Math.max(result, (prefix[j] - prefix[i]) / (j - i) + dp[j]);
            }
            ndp[i] = result;
        }
        dp = ndp;
    }

    return dp[0];
};
