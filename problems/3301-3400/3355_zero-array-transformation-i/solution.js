/**
 * @param {number[]} nums
 * @param {number[][]} queries
 * @return {boolean}
 */
var isZeroArray = function (nums, queries) {
    const n = nums.length;
    // Difference array: +1 at l and -1 at r+1 per query; the spare slot
    // at index n absorbs the r+1 == n write without a bounds check.
    const diff = new Array(n + 1).fill(0);
    for (const [l, r] of queries) {
        diff[l] += 1;
        diff[r + 1] -= 1;
    }
    let coverage = 0;
    // The prefix sum recovers how many queries cover each index. Each
    // covering query removes at most one unit there, so zeroing is
    // possible iff coverage never falls below nums[i].
    for (let i = 0; i < n; i++) {
        coverage += diff[i];
        if (coverage < nums[i]) return false;
    }
    return true;
};
