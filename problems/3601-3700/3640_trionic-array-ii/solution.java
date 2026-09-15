class Solution {

    public long maxSumTrionic(int[] nums) {
        // Best sums of subarrays ending at the previous element: s0 inside
        // the first climb (length >= 2), s1 descending after a finished
        // climb, s2 a full trionic mid-final-climb. Unreachable sits on a
        // sentinel far below any real sum.
        final long NEG = -(1L << 60);
        long s0 = NEG,
            s1 = NEG,
            s2 = NEG;
        long best = NEG;
        for (int i = 1; i < nums.length; i++) {
            long prev = nums[i - 1],
                x = nums[i];
            if (x > prev) {
                // Rising step: the final climb continues or opens from a
                // finished descent; the first climb extends from itself or
                // grows past the lone previous element.
                s2 = Math.max(s2, s1) + x;
                s0 = Math.max(s0, prev) + x;
                s1 = NEG;
            } else if (x < prev) {
                // Falling step: the descent continues or opens from a
                // finished two-element climb; climbs cannot persist.
                s1 = Math.max(s1, s0) + x;
                s0 = s2 = NEG;
            } else {
                // Equal neighbors break strictness on both sides.
                s0 = s1 = s2 = NEG;
            }
            best = Math.max(best, s2);
        }
        return best;
    }
}
