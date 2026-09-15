function maximumsSplicedArray(nums1: number[], nums2: number[]): number {
    // A swap moves a contiguous block of difference between the arrays:
    // sum(nums1) changes by the range sum of nums2[i] - nums1[i], and
    // sum(nums2) by the negated amount. Each side's best outcome is its
    // base sum plus a maximum subarray of that difference array.
    const splicedBest = (base: number[], other: number[]): number => {
        // Kadane clamped at 0 covers "not do anything" for free.
        let baseSum = 0;
        let bestGain = 0;
        let current = 0;
        for (let i = 0; i < base.length; ++i) {
            baseSum += base[i];
            const difference = other[i] - base[i];
            current = Math.max(difference, current + difference);
            bestGain = Math.max(bestGain, current);
        }
        return baseSum + bestGain;
    };
    return Math.max(splicedBest(nums1, nums2), splicedBest(nums2, nums1));
}
