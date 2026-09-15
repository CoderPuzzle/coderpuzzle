class Solution {

    public int minElement(int[] nums) {
        // Replacement acts per element, and a number's digit sum is never
        // larger than the number itself, so the answer is the smallest
        // per-element digit sum.
        int best = Integer.MAX_VALUE;
        for (int value : nums) {
            int digitSum = 0;
            while (value > 0) {
                digitSum += value % 10;
                value /= 10;
            }
            // The running minimum can only decrease: every replacement
            // shrinks (or keeps) its element.
            best = Math.min(best, digitSum);
        }
        return best;
    }
}
