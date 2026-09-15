/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var minimumDifference = function (nums, k) {
    // Sort so the k chosen students form a contiguous window; the span of
    // that window is its highest minus lowest score.
    nums.sort((a, b) => a - b);
    let best = nums[k - 1] - nums[0];
    for (let i = k; i < nums.length; ++i) {
        best = Math.min(best, nums[i] - nums[i - k + 1]);
    }
    return best;
};
