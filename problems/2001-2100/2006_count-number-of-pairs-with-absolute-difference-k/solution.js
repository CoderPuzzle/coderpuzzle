/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var countKDifference = function (nums, k) {
    let pairs = 0;
    for (let first = 0; first < nums.length; ++first) {
        for (let second = first + 1; second < nums.length; ++second) {
            if (Math.abs(nums[first] - nums[second]) === k) {
                ++pairs;
            }
        }
    }
    return pairs;
};
