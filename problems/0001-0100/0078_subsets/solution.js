/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
    const n = nums.length;
    const subsets = [];
    // Count masks upward from all bits clear ([]) to all bits set (the
    // whole array): bit i set means nums[i] is in the subset.
    for (let mask = 0; mask < 1 << n; ++mask) {
        const current = [];
        for (let i = 0; i < n; ++i) {
            // Bit i set: nums[i] joins, in input order within the subset.
            if (mask & (1 << i)) {
                current.push(nums[i]);
            }
        }
        subsets.push(current);
    }
    return subsets;
};
