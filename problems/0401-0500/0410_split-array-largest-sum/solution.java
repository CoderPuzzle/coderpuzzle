class Solution {

    public int splitArray(int[] nums, int k) {
        // Binary-search the answer: the smallest limit for which k pieces
        // suffice (the piece count only falls as the limit rises). Bounds:
        // no element can be split, and one piece covering everything works.
        long lo = Long.MIN_VALUE;
        long hi = 0;
        for (int value : nums) {
            lo = Math.max(lo, value);
            hi += value;
        }
        while (lo < hi) {
            long mid = (lo + hi) >>> 1;
            if (feasible(nums, k, mid)) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        return (int) lo;
    }

    private boolean feasible(int[] nums, int k, long limit) {
        // Greedy piece count under the limit: extending each piece as far
        // as possible never forces more pieces later.
        int pieces = 1;
        long current = 0;
        for (int value : nums) {
            if (current + value > limit) {
                pieces++;
                if (pieces > k) {
                    return false;
                }
                current = value;
            } else {
                current += value;
            }
        }
        return true;
    }
}
