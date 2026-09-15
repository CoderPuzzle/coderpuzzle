/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var maxDotProduct = function (nums1, nums2) {
    const n = nums1.length;
    const m = nums2.length;
    const NEG = -Infinity;
    const dp = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(NEG));
    for (let i = n - 1; i >= 0; i--) {
        for (let j = m - 1; j >= 0; j--) {
            const pair = nums1[i] * nums2[j];
            const tail = dp[i + 1][j + 1];
            dp[i][j] = Math.max(pair + Math.max(tail, 0), dp[i + 1][j], dp[i][j + 1]);
        }
    }
    return dp[0][0];
};
