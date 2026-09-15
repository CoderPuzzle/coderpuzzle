class Solution {

    public long maximumProduct(int[] nums, int m) {
        // A size-m subsequence with first index i and last index j
        // exists iff j >= i + m - 1. For m == 1 first and last are the
        // same element, so the answer is the best square. Otherwise
        // sweep i downward: the eligible window nums[i + m - 1:] grows
        // by one entry per step, so its max and min update in O(1), and
        // one of those two extremes is always the best partner for
        // nums[i]. Products reach 1e5 * 1e5, so long math is required.
        int n = nums.length;
        if (m == 1) {
            long best = Long.MIN_VALUE;
            for (int v : nums) {
                best = Math.max(best, (long) v * v);
            }
            return best;
        }
        long smax = nums[n - 1];
        long smin = nums[n - 1];
        long best = (long) nums[n - m] * nums[n - 1];
        for (int i = n - m - 1; i >= 0; --i) {
            int v = nums[i + m - 1];
            if (v > smax) {
                smax = v;
            } else if (v < smin) {
                smin = v;
            }
            best = Math.max(best, Math.max((long) nums[i] * smax, (long) nums[i] * smin));
        }
        return best;
    }
}
