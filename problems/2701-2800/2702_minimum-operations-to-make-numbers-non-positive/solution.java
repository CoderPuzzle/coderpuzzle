class Solution {

    // After t operations index i has absorbed t*y of decrement plus an
    // extra (x - y) every time it was picked, so candidate t is feasible
    // iff the required picks fit inside the t operations. The running
    // pick total can pass 2^31 before the early exit fires, so products
    // and the accumulator stay in long.
    private boolean feasible(int[] nums, long t, int x, int y) {
        long base = t * (long) y;
        long gain = (long) x - y;
        long used = 0;
        for (int value : nums) {
            if (value > base) {
                used += (value - base + gain - 1) / gain;
                if (used > t) {
                    return false;
                }
            }
        }
        return true;
    }

    public int minOperations(int[] nums, int x, int y) {
        int maxValue = 0;
        for (int value : nums) {
            maxValue = Math.max(maxValue, value);
        }
        long low = 1;
        long high = ((long) maxValue + y - 1) / y; // ceil(maxValue / y)
        while (low < high) {
            long mid = low + (high - low) / 2;
            if (feasible(nums, mid, x, y)) {
                high = mid;
            } else {
                low = mid + 1;
            }
        }
        return (int) low;
    }
}
