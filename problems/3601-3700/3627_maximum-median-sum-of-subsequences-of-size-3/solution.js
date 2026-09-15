/**
 * @param {number[]} nums
 * @return {number}
 */
var maximumMedianSum = function (nums) {
    // Sorted descending, the optimal play pairs the two largest remaining
    // values with the smallest remaining one: the largest is sacrificed
    // every step (it can only be a median of a triple that contains an
    // even larger element, which is impossible to arrange for all of
    // them), so spending it on deleting the smallest leftover is free.
    // Step t therefore consumes s[2t], s[2t + 1] and the t-th smallest
    // value s[n - 1 - t], making the medians the odd indices 1, 3, 5,
    // ... -- the first n/3 of them. The sum reaches ~1.7e14 < 2^53, so
    // Number math is exact.
    nums.sort((a, b) => b - a);
    let total = 0;
    for (let i = 1; i < 2 * Math.floor(nums.length / 3); i += 2) {
        total += nums[i];
    }
    return total;
};
