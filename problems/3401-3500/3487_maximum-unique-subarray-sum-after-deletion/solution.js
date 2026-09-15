/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSum = function (nums) {
    // Deletions are free, so the chosen subarray is really a set of
    // distinct values: keep every positive value once, and when no
    // positive exists the best set is the single largest element.
    const seen = new Set();
    let total = 0;
    for (const v of nums) {
        if (v > 0 && !seen.has(v)) {
            seen.add(v);
            total += v;
        }
    }
    if (seen.size > 0) {
        return total;
    }
    return Math.max(...nums);
};
