/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number[]} nums3
 * @param {number[]} nums4
 * @return {number}
 */
var fourSumCount = function (nums1, nums2, nums3, nums4) {
    // Meet in the middle: a+b+c+d = 0 iff a+b = -(c+d), so index the nums1
    // two arrays' pair sums with multiplicities (not a set).
    const sums = new Map();
    for (const a of nums1) {
        for (const b of nums2) {
            const key = a + b;
            sums.set(key, (sums.get(key) || 0) + 1);
        }
    }
    let total = 0;
    // Each (c,d) pair adds the number of (a,b) pairs summing to its
    // negation; every zero tuple is counted once via its unique split.
    for (const c of nums3) {
        for (const d of nums4) {
            total += sums.get(-(c + d)) || 0;
        }
    }
    return total;
};
