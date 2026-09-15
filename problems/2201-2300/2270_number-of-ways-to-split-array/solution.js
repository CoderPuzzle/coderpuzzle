/**
 * @param {number[]} nums
 * @return {number}
 */
var waysToSplitArray = function (nums) {
    // A rolling prefix sum plus the precomputed total decides each split in
    // O(1); the right half is simply total - prefix. Sums reach +/-1e10 here,
    // well inside Number's exact 2^53 integer range.
    let total = 0;
    for (const x of nums) {
        total += x;
    }
    let prefix = 0;
    let count = 0;
    for (let i = 0; i + 1 < nums.length; i++) {
        prefix += nums[i];
        if (prefix >= total - prefix) {
            count++;
        }
    }
    return count;
};
