/**
 * @param {number[]} nums
 * @return {number}
 */
var validSubarraySplit = function (nums) {
    // dp[i] = fewest subarrays to validly split nums[:i]; dp[0] = 0.
    // The last subarray ends at i - 1, so its start j must satisfy
    // gcd(nums[j], nums[i - 1]) > 1, giving the transition dp[j] + 1.
    const n = nums.length;
    const inf = n + 1;
    const dp = new Array(n + 1).fill(inf);
    dp[0] = 0;
    for (let i = 1; i <= n; ++i) {
        for (let j = 0; j < i; ++j) {
            if (gcd(nums[j], nums[i - 1]) > 1 && dp[j] + 1 < dp[i]) {
                dp[i] = dp[j] + 1;
            }
        }
    }
    return dp[n] < inf ? dp[n] : -1;
};

function gcd(a, b) {
    while (b !== 0) {
        const next = a % b;
        a = b;
        b = next;
    }
    return a;
}
