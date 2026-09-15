/**
 * @param {number[]} nums
 * @return {number[]}
 */
var minSubsequence = function (nums) {
    // The chosen subsequence must sum to more than half the total. Every
    // element is positive, so taking the largest elements first yields the
    // minimum size and, per size, the maximum sum.
    nums.sort((a, b) => b - a);
    const total = nums.reduce((sum, value) => sum + value, 0);
    let running = 0;
    for (let i = 0; i < nums.length; i++) {
        running += nums[i];
        if (running * 2 > total) {
            return nums.slice(0, i + 1);
        }
    }
    return nums;
};
