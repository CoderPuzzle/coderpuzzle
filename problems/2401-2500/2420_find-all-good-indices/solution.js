/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var goodIndices = function (nums, k) {
    // Run-length DP: noninc[i] is the longest non-increasing run ending at
    // i; nondec[i] the longest non-decreasing run starting at i. Index i is
    // good exactly when both runs flanking it reach length k:
    // noninc[i-1] >= k covers nums[i-k..i-1], nondec[i+1] >= k covers
    // nums[i+1..i+k]. Two linear sweeps plus one pass over the candidate
    // range replace an O(n*k) window scan.
    const n = nums.length;
    const noninc = new Array(n).fill(1);
    const nondec = new Array(n).fill(1);
    for (let i = 1; i < n; ++i) {
        if (nums[i] <= nums[i - 1]) {
            noninc[i] = noninc[i - 1] + 1;
        }
    }
    for (let i = n - 2; i >= 0; --i) {
        if (nums[i] <= nums[i + 1]) {
            nondec[i] = nondec[i + 1] + 1;
        }
    }
    const good = [];
    for (let i = k; i < n - k; ++i) {
        if (noninc[i - 1] >= k && nondec[i + 1] >= k) {
            good.push(i);
        }
    }
    return good;
};
