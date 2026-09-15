/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var delayedCount = function (nums, k) {
    // Sweep i from the right; freq counts occurrences of each value in
    // the window [i + k + 1, n - 1], so stepping i down inserts exactly
    // nums[i + k + 1] and the delayed count is a single lookup.
    const n = nums.length;
    const ans = new Array(n).fill(0);
    const freq = new Map();
    for (let i = n - 1; i >= 0; i--) {
        const ahead = i + k + 1;
        if (ahead < n) {
            freq.set(nums[ahead], (freq.get(nums[ahead]) || 0) + 1);
        }
        ans[i] = freq.get(nums[i]) || 0;
    }
    return ans;
};
