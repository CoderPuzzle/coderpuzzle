/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minArrayLength = function (nums, k) {
    // A zero merges with anything (0 * y = 0 <= k), so it drags the whole
    // array down to a single element.
    if (nums.includes(0)) {
        return 1;
    }
    // Merge adjacent ones (1 * 1 = 1 <= k) so no two neighbors are both 1;
    // every remaining pair then multiplies to at least 2, which bounds
    // each backward scan by 2 * log2(k).
    const b = [];
    for (const v of nums) {
        if (v !== 1 || b.length === 0 || b[b.length - 1] !== 1) {
            b.push(v);
        }
    }
    const m = b.length;
    const dp = new Array(m + 1).fill(0);
    for (let i = 1; i <= m; ++i) {
        dp[i] = dp[i - 1] + 1;
        // Walk left multiplying while the merged product stays <= k: each
        // surviving j is the block b[j-1..i-1] merged to one spot. Every
        // continued product is <= k < 2^53 and hence exact in a double;
        // once the true product passes 2^53 the rounded value is still far
        // above k (k <= 1e9), so every stop decision stays exact.
        let prod = 1,
            j = i;
        while (j >= 1) {
            prod *= b[j - 1];
            if (prod > k) {
                break;
            }
            if (dp[j - 1] + 1 < dp[i]) {
                dp[i] = dp[j - 1] + 1;
            }
            --j;
        }
    }
    return dp[m];
};
