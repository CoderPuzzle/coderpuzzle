/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var minAbsoluteSumDiff = function (nums1, nums2) {
    // The initial sum is fixed; a replacement at index i can only cut
    // |nums1[i] - nums2[i]| down to the distance from nums2[i] to the
    // nearest value in nums1, so hunt that nearest value in a sorted
    // copy and keep the largest saving seen.
    const MOD = 1000000007;
    const sorted1 = [...nums1].sort((a, b) => a - b);
    let total = 0;
    let bestGain = 0;
    for (let i = 0; i < nums1.length; i++) {
        const diff = Math.abs(nums1[i] - nums2[i]);
        total += diff;
        // neighbors of nums2[i] in the sorted copy bracket the nearest value
        let lo = 0;
        let hi = sorted1.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (sorted1[mid] < nums2[i]) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        let nearest = diff;
        if (lo < sorted1.length) {
            nearest = Math.min(nearest, sorted1[lo] - nums2[i]);
        }
        if (lo > 0) {
            nearest = Math.min(nearest, nums2[i] - sorted1[lo - 1]);
        }
        bestGain = Math.max(bestGain, diff - nearest);
    }
    // the raw sum tops out at 10^10, far below Number's 2^53 ceiling for
    // exact integers, so plain number arithmetic stays exact throughout
    return (total - bestGain) % MOD;
};
