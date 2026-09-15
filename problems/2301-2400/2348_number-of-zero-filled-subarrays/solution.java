class Solution {

    public long zeroFilledSubarray(int[] nums) {
        // Every zero-filled subarray ends at exactly one index, and the ones
        // ending at i are exactly the run of consecutive zeros through i —
        // add the current run length at every zero. Totals reach ~5e9, so
        // accumulate in 64 bits.
        long total = 0;
        long run = 0;
        for (int value : nums) {
            if (value == 0) {
                ++run;
                total += run;
            } else {
                run = 0;
            }
        }
        return total;
    }
}
