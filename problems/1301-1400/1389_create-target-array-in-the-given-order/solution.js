/**
 * @param {number[]} nums
 * @param {number[]} index
 * @return {number[]}
 */
var createTargetArray = function (nums, index) {
    // Direct simulation: each step splices nums[i] into the growing array
    // at position index[i], pushing the tail right. index[i] <= i keeps
    // every insertion inside the array built so far.
    const target = [];
    for (let i = 0; i < nums.length; ++i) {
        target.splice(index[i], 0, nums[i]);
    }
    return target;
};
