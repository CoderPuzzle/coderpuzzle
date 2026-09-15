/**
 * @param {number[]} nums
 * @return {number}
 */
var minimumMountainRemovals = function (nums) {
    const n = nums.length;
    // lis[i]: longest strictly increasing subsequence ending at i (strict
    // comparisons — plateaus can ride neither slope); lds[i]: symmetric
    // strictly decreasing chain starting at i, built scanning right to left.
    const lis = new Array(n).fill(1);
    const lds = new Array(n).fill(1);
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < i; j++) {
            if (nums[j] < nums[i] && lis[j] + 1 > lis[i]) {
                lis[i] = lis[j] + 1;
            }
        }
    }
    for (let i = n - 1; i >= 0; i--) {
        for (let j = i + 1; j < n; j++) {
            if (nums[j] < nums[i] && lds[j] + 1 > lds[i]) {
                lds[i] = lds[j] + 1;
            }
        }
    }
    // Minimizing removals = maximizing mountain length. A valid peak needs
    // at least one element on each side, and the peak is counted by both
    // tables, hence the -1.
    let best = 0;
    for (let i = 0; i < n; i++) {
        if (lis[i] >= 2 && lds[i] >= 2) {
            best = Math.max(best, lis[i] + lds[i] - 1);
        }
    }
    return n - best;
};
