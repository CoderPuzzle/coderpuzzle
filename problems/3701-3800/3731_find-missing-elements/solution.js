/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findMissingElements = function (nums) {
    // Mark presence per value, then sweep the original range [min, max] in
    // increasing order: every unmarked value is missing, and sweeping in
    // order yields the sorted result directly.
    const lo = Math.min(...nums);
    const hi = Math.max(...nums);
    const present = new Array(hi + 1).fill(false);
    for (const value of nums) {
        present[value] = true;
    }
    const missing = [];
    for (let value = lo; value <= hi; ++value) {
        if (!present[value]) {
            missing.push(value);
        }
    }
    return missing;
};
