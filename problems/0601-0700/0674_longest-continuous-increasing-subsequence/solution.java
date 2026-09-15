class Solution {

    public int findLengthOfLCIS(int[] nums) {
        // Single pass with a run counter: a strict rise extends the
        // increasing run under the cursor, anything else restarts it at 1.
        int run = 1;
        int best = 1;
        for (int i = 1; i < nums.length; ++i) {
            if (nums[i] > nums[i - 1]) {
                ++run;
                // A run only reaches its full length at its last element,
                // so tracking the best while it grows misses nothing.
                best = Math.max(best, run);
            } else {
                run = 1;
            }
        }
        return best;
    }
}
