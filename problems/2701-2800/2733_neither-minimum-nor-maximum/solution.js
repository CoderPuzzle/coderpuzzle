/**
 * @param {number[]} nums
 * @return {number}
 */
var findNonMinOrMax = function (nums) {
    if (nums.length < 3) {
        return -1;
    }
    const sum = nums[0] + nums[1] + nums[2];
    const lo = Math.min(nums[0], nums[1], nums[2]);
    const hi = Math.max(nums[0], nums[1], nums[2]);
    return sum - lo - hi;
};
