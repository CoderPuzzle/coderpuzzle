/**
 * @param {number[]} nums
 * @return {number}
 */
var alternatingSum = function (nums) {
    // Even indices add, odd indices subtract: walk the array two positions
    // at a time, adding each even-index element and subtracting the
    // odd-index partner that follows it. A trailing element at the last
    // even index has no partner to subtract.
    let total = 0;
    for (let i = 0; i < nums.length; i += 2) {
        total += nums[i];
        if (i + 1 < nums.length) {
            total -= nums[i + 1];
        }
    }
    return total;
};
