/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumScore = function (nums) {
    const n = nums.length;
    // The running prefix sum reaches n * 10^9 = 10^14, safely inside the
    // 2^53 exact range, so plain numbers carry it exactly.
    let total = 0;
    for (let i = 0; i < n; i++) {
        total += nums[i];
    }
    // Sweep the split indices right to left carrying two running views:
    // p holds prefixSum(i) and suffixMin holds the minimum of
    // nums[i + 1..n - 1]. The last valid split seeds the answer.
    let p = total - nums[n - 1];
    let suffixMin = nums[n - 1];
    let best = p - suffixMin;
    for (let i = n - 3; i >= 0; i--) {
        // Moving to split i folds nums[i + 1] into both views.
        suffixMin = Math.min(suffixMin, nums[i + 1]);
        p -= nums[i + 1];
        const score = p - suffixMin;
        if (score > best) {
            best = score;
        }
    }
    return best;
};
