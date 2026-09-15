/**
 * @param {number[]} nums
 * @return {number}
 */
var numberOfArithmeticSlices = function (nums) {
    const n = nums.length;
    // dp[i].get(d) = number of arithmetic subsequences of length >= 2 ending
    // at i with common difference d. Hashing per (index, difference)
    // absorbs the huge, possibly negative differences.
    const dp = new Array(n);
    for (let i = 0; i < n; i++) dp[i] = new Map();
    let total = 0;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            const d = nums[i] - nums[j];
            const cnt = dp[j].get(d) || 0;
            // Each length >= 2 subsequence ending at j extends by nums[i]
            // into a slice of length >= 3, counted once at its last element.
            total += cnt;
            // cnt extensions plus the new length-2 pair (j, i) itself;
            // pairs of exactly length 2 reach the total only via extension.
            dp[i].set(d, (dp[i].get(d) || 0) + cnt + 1);
        }
    }
    return total;
};
