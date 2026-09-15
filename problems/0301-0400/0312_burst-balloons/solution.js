/**
 * @param {number[]} nums
 * @return {number}
 */
var maxCoins = function (nums) {
    // Pad with virtual 1s so bursts at the boundary need no special casing.
    const padded = [1, ...nums, 1];
    const m = padded.length;
    const dp = Array.from({ length: m }, () => new Array(m).fill(0));
    // Fill by increasing interval length so both subintervals of a cell
    // are already solved when it is needed.
    for (let length = 1; length < m - 1; length++) {
        for (let left = 1; left < m - length; left++) {
            const right = left + length - 1;
            // Try each k as the LAST burst in the open interval (left, right):
            // at that moment its neighbors are the fixed boundaries.
            for (let k = left; k <= right; k++) {
                const coins = padded[left - 1] * padded[k] * padded[right + 1] + dp[left][k - 1] + dp[k + 1][right];
                if (coins > dp[left][right]) {
                    dp[left][right] = coins;
                }
            }
        }
    }
    // Everything strictly between the two padding 1s.
    return dp[1][m - 2];
};
