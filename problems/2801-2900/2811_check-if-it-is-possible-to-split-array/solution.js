/**
 * @param {number[]} nums
 * @param {number} m
 * @return {boolean}
 */
var canSplitArray = function (nums, m) {
    // Lengths 1 and 2 reach singletons unconditionally. Beyond that, some
    // adjacent pair must sum to at least m: the last cut of any finishing
    // run frees a final two-element piece that was produced good, while any
    // qualifying pair stays glued as lone elements peel off the ends.
    if (nums.length <= 2) {
        return true;
    }
    for (let i = 1; i < nums.length; ++i) {
        if (nums[i - 1] + nums[i] >= m) {
            return true;
        }
    }
    return false;
};
