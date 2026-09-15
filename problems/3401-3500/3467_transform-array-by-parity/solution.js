/**
 * @param {number[]} nums
 * @return {number[]}
 */
var transformArray = function (nums) {
    // After the parity replacement every entry is 0 or 1, so the sorted
    // result is just zeros for the evens followed by ones for the odds.
    const ones = nums.reduce((acc, x) => acc + (x & 1), 0);
    const result = new Array(nums.length).fill(0);
    result.fill(1, nums.length - ones);
    return result;
};
