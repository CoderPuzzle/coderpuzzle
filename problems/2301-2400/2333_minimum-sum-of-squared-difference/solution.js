/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @param {number} k1
 * @param {number} k2
 * @return {number}
 */
var minSumSquareDiff = function (nums1, nums2, k1, k2) {
    // Only |nums1[i] - nums2[i]| matters: a +1 on either array moves the
    // difference one step in whichever direction we pick, so k1 and k2
    // pool into one budget spent on absolute differences. Sums stay below
    // 2^53 (n * V^2 <= 10^5 * 10^10), so plain numbers stay exact even
    // though the answer far exceeds 32 bits.
    const n = nums1.length;
    let top = 0;
    for (let index = 0; index < n; index++) {
        top = Math.max(top, Math.abs(nums1[index] - nums2[index]));
    }
    const counts = new Array(top + 1).fill(0);
    for (let index = 0; index < n; index++) {
        counts[Math.abs(nums1[index] - nums2[index])]++;
    }
    // Lowering an entry from v to v - 1 removes 2v - 1 from the sum,
    // more the larger v is, so a currently largest entry absorbs every
    // operation and none goes past zero (|d| would grow again). Sweep
    // levels downward, move whole buckets while the budget covers them,
    // split the bucket it does not cover.
    let budget = k1 + k2;
    for (let level = top; level >= 1 && budget > 0; level--) {
        const moved = Math.min(counts[level], budget);
        if (moved === 0) {
            continue;
        }
        counts[level - 1] += moved;
        counts[level] -= moved;
        budget -= moved;
    }
    let total = 0;
    for (let level = 0; level <= top; level++) {
        total += level * level * counts[level];
    }
    return total;
};
