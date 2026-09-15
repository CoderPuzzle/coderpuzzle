/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minCost = function (nums1, nums2) {
    // Within-array swaps are free, so only the frequency of each value in
    // each array matters. Both arrays must end with the same multiset:
    // value v appears (cnt1[v] + cnt2[v]) / 2 times in each, which is
    // possible only when that combined count is even. Every count is at
    // most n <= 8e4, far inside Number's exact 2^53 range, so plain
    // arithmetic is safe.
    const cnt1 = new Map();
    const cnt2 = new Map();
    const values = new Set();
    for (const v of nums1) {
        cnt1.set(v, (cnt1.get(v) ?? 0) + 1);
        values.add(v);
    }
    for (const v of nums2) {
        cnt2.set(v, (cnt2.get(v) ?? 0) + 1);
        values.add(v);
    }
    let totalDiff = 0;
    for (const v of values) {
        const a = cnt1.get(v) ?? 0;
        const b = cnt2.get(v) ?? 0;
        if ((a + b) % 2 === 1) return -1;
        totalDiff += Math.abs(a - b);
    }
    // Each cross swap moves one surplus element out of nums1 and one out of
    // nums2, fixing two placements at once. The surplus in nums1 is half the
    // positive differences, which is a quarter of the sum of all differences
    // because the two arrays are equally large.
    return totalDiff / 4;
};
