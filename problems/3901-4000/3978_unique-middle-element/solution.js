/**
 * @param {number[]} nums
 * @return {boolean}
 */
var isMiddleElementUnique = function (nums) {
    const middle = nums[Math.floor(nums.length / 2)];
    let count = 0;
    for (const value of nums) {
        if (value === middle) count++;
    }
    return count === 1;
};
