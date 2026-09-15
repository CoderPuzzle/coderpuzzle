/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function (nums, k) {
    // Seed with the empty prefix so subarrays starting at index 0 are counted.
    const prefixCounts = new Map([[0, 1]]);
    let running = 0;
    let total = 0;
    for (const value of nums) {
        running += value;
        // Subarrays ending here sum to k exactly when an earlier prefix equals running - k.
        total += prefixCounts.get(running - k) || 0;
        // Record only after counting, so a subarray never matches against itself.
        prefixCounts.set(running, (prefixCounts.get(running) || 0) + 1);
    }
    return total;
};
