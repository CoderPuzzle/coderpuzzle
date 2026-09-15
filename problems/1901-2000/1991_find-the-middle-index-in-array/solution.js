/**
 * @param {number[]} nums
 * @return {number}
 */
var findMiddleIndex = function (nums) {
    // Single pass with a running left sum: an index is a middle index when
    // left == total - left - nums[i] (the right side's sum). Every sum is
    // bounded by 100 * 1000 = 1e5, far inside Number's exact range.
    const total = nums.reduce((a, b) => a + b, 0);
    let left = 0;
    for (let i = 0; i < nums.length; ++i) {
        if (left === total - left - nums[i]) return i;
        left += nums[i];
    }
    return -1;
};
