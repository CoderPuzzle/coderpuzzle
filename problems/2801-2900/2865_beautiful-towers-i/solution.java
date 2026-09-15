class Solution {

    public long maximumSumOfHeights(int[] heights) {
        int n = heights.length;
        int[] reversed = new int[n];
        for (int i = 0; i < n; ++i) {
            reversed[i] = heights[n - 1 - i];
        }
        // best[i] = heaviest sum of a non-decreasing ramp ending at i with
        // tower i kept at full height; one stack sweep per direction gives
        // every peak candidate in O(n) total.
        long[] left = rampSums(heights);
        long[] right = rampSums(reversed);
        for (int l = 0, r = n - 1; l < r; ++l, --r) {
            // back to original indices
            long tmp = right[l];
            right[l] = right[r];
            right[r] = tmp;
        }
        long best = 0;
        for (int i = 0; i < n; ++i) {
            // Tower i sits in both ramps when it is the peak, so its own
            // height is counted once per direction and must be subtracted.
            best = Math.max(best, left[i] + right[i] - heights[i]);
        }
        return best;
    }

    // A stack of (height, width) runs holds the clamped prefix; popping
    // taller runs re-stamps those towers at the current, lower height in
    // one multiply instead of touching them one by one.
    private long[] rampSums(int[] nums) {
        long[] best = new long[nums.length];
        long[] runHeight = new long[nums.length]; // parallel run stacks
        long[] runWidth = new long[nums.length];
        int top = -1;
        long total = 0;
        for (int i = 0; i < nums.length; ++i) {
            long width = 1;
            while (top >= 0 && runHeight[top] >= nums[i]) {
                total -= runHeight[top] * runWidth[top];
                width += runWidth[top--];
            }
            total += (long) nums[i] * width;
            runHeight[++top] = nums[i];
            runWidth[top] = width;
            best[i] = total;
        }
        return best;
    }
}
