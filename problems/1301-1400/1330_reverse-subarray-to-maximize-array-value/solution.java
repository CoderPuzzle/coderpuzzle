class Solution {

    public int maxValueAfterReverse(int[] nums) {
        // Reversing [L, R] only rewires the two boundary links. Gains split
        // into: prefix/suffix reversals (one boundary term each) and interior
        // reversals, bounded by 2*(max adjacent min - min adjacent max).
        int n = nums.length;
        long total = 0;
        for (int i = 0; i < n - 1; ++i) {
            total += Math.abs(nums[i] - nums[i + 1]);
        }
        long bestGain = 0;
        long big = Long.MIN_VALUE; // max over adjacent-pair minima
        long small = Long.MAX_VALUE; // min over adjacent-pair maxima
        for (int i = 0; i < n - 1; ++i) {
            int a = nums[i];
            int b = nums[i + 1];
            // reverse [0..i]: the (i, i+1) link becomes (0, i+1)
            bestGain = Math.max(bestGain, Math.abs(nums[0] - b) - (long) Math.abs(a - b));
            // reverse [i+1..n-1]: the (i, i+1) link becomes (i, n-1)
            bestGain = Math.max(bestGain, Math.abs(nums[n - 1] - a) - (long) Math.abs(a - b));
            big = Math.max(big, Math.min(a, b));
            small = Math.min(small, Math.max(a, b));
        }
        if (big > small) {
            bestGain = Math.max(bestGain, 2 * (big - small));
        }
        // The statement guarantees the answer fits in 32 bits.
        return (int) (total + bestGain);
    }
}
