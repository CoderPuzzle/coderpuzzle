/**
 * @param {number[]} nums
 * @return {number}
 */
var pivotIndex = function (nums) {
    // One pass over prefix sums: the total and a running left sum give
    // both sides of index i, since right = total - left - nums[i].
    let total = 0;
    for (const x of nums) {
        total += x;
    }
    let left = 0;
    for (let i = 0; i < nums.length; ++i) {
        if (left === total - left - nums[i]) {
            // The first qualifying index is the leftmost by construction.
            return i;
        }
        left += nums[i];
    }
    return -1;
};
