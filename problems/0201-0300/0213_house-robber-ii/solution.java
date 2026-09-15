class Solution {

    public long rob(int[] nums) {
        // A lone house has no distinct neighbor on either side, so robbing it
        // is legal even though both "give up an end" sweeps below see nothing.
        if (nums.length == 1) {
            return nums[0];
        }
        // The circle's only extra edge over the line joins the first and last
        // houses, so every legal plan gives up the first house or the last:
        // solve the linear street on nums[1:] and nums[:-1], keep the better.
        return Math.max(robLine(nums, 1, nums.length), robLine(nums, 0, nums.length - 1));
    }

    // Rolling two-variable DP over houses[start, stop): cur is the best through
    // house i-1, prev the best through i-2, so no DP table is ever allocated.
    private long robLine(int[] nums, int start, int stop) {
        long prev = 0;
        long cur = 0;
        for (int i = start; i < stop; ++i) {
            long next = Math.max(cur, prev + nums[i]);
            prev = cur;
            cur = next;
        }
        return cur;
    }
}
