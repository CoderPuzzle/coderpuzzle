class Solution {

    public int maximumsSplicedArray(int[] nums1, int[] nums2) {
        // A swap moves a contiguous block of difference between the arrays:
        // sum(nums1) changes by the range sum of nums2[i] - nums1[i], and
        // sum(nums2) by the negated amount. Each side's best outcome is its
        // base sum plus a maximum subarray of that difference array. Every
        // total stays in int range: even one array absorbing everything
        // caps at sum(nums1) + sum(nums2) <= 2 * 10^9 < 2^31 - 1.
        return Math.max(splicedBest(nums1, nums2), splicedBest(nums2, nums1));
    }

    private int splicedBest(int[] base, int[] other) {
        // Kadane clamped at 0 covers "not do anything" for free.
        int baseSum = 0;
        int bestGain = 0;
        int current = 0;
        for (int i = 0; i < base.length; ++i) {
            baseSum += base[i];
            int difference = other[i] - base[i];
            current = Math.max(difference, current + difference);
            bestGain = Math.max(bestGain, current);
        }
        return baseSum + bestGain;
    }
}
