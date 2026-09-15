class Solution {

    public int maximumScore(int[] nums, int[] multipliers) {
        int m = multipliers.length;
        int n = nums.length;
        final long NEG_INF = Long.MIN_VALUE / 4;
        // Base: after all m operations no score remains — stage m is all 0.
        long[] prev = new long[m + 1];
        long[] cur = new long[m + 1];
        // State (i, l) is complete: l taken from the left forces r = i - l
        // from the right, so the remaining ends are nums[l] and
        // nums[n - 1 - r] and nothing else matters. Slots with l > i are
        // unreachable and can never win a max.
        for (int i = m - 1; i >= 0; i--) {
            for (int l = 0; l <= i; l++) {
                int r = i - l;
                // prev holds stage i + 1: taking the left moves to
                // (i+1, l+1), taking the right to (i+1, l).
                long takeLeft = prev[l + 1] + (long) multipliers[i] * nums[l];
                long takeRight = prev[l] + (long) multipliers[i] * nums[n - 1 - r];
                cur[l] = takeLeft >= takeRight ? takeLeft : takeRight;
            }
            long[] tmp = prev;
            prev = cur;
            cur = tmp;
        }
        // State (0, 0): no operations used, nothing taken from the left.
        return (int) prev[0];
    }
}
