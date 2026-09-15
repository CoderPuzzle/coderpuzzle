class Solution {

    // All k doublings belong on one element: the OR's top bit comes from
    // a single element, and giving that element every operation only
    // pushes its bits higher, so split plans are never better. The
    // boosted element reaches 10^9 * 2^15 < 2^45, past int range, so it
    // widens to long before shifting (an int shifted 15 places wraps).
    public long maximumOr(int[] nums, int k) {
        int n = nums.length;
        // suffix[i] = OR of nums[i:], so the OR of every element except i
        // is prefix | suffix in O(1) while i sweeps left to right.
        long[] suffix = new long[n + 1];
        for (int i = n - 1; i >= 0; i--) suffix[i] = suffix[i + 1] | nums[i];
        long best = 0;
        long prefix = 0;
        for (int i = 0; i < n; i++) {
            // The full OR with nums[i] << k swapped in for nums[i].
            long candidate = prefix | ((long) nums[i] << k) | suffix[i + 1];
            if (candidate > best) best = candidate;
            prefix |= nums[i];
        }
        return best;
    }
}
