/**
 * @param {number[]} nums
 * @param {number} diff
 * @return {number}
 */
var arithmeticTriplets = function (nums, diff) {
    // Strictly increasing means every value occurs once, so a triplet is
    // determined by its middle: count elements whose value - diff and
    // value + diff are both present.
    const seen = new Set(nums);
    let count = 0;
    for (const value of nums) {
        if (seen.has(value - diff) && seen.has(value + diff)) {
            ++count;
        }
    }
    return count;
};
