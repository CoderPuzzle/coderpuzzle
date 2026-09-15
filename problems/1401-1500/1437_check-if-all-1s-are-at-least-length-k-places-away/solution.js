/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
var kLengthApart = function (nums, k) {
    let previous = -1;
    for (let index = 0; index < nums.length; index++) {
        if (nums[index] === 1) {
            if (previous >= 0 && index - previous <= k) {
                return false;
            }
            previous = index;
        }
    }
    return true;
};
