class Solution {

    public int maxSubarraySumCircular(int[] nums) {
        int total = 0;
        for (int x : nums) {
            total += x;
        }
        // One pass runs Kadane twice: bestMax for the non-wrapping case, and
        // bestMin because a wrapping subarray is total minus the omitted
        // middle chunk, which must be minimized. Seeding with nums[0] keeps
        // every candidate non-empty.
        int curMax = nums[0],
            bestMax = nums[0];
        int curMin = nums[0],
            bestMin = nums[0];
        for (int i = 1; i < nums.length; i++) {
            int x = nums[i];
            curMax = x + Math.max(curMax, 0);
            bestMax = Math.max(bestMax, curMax);
            curMin = x + Math.min(curMin, 0);
            bestMin = Math.min(bestMin, curMin);
        }
        if (bestMax < 0) {
            // All negative: the wrap candidate degenerates to the empty
            // subarray, which is not allowed — answer is the best run.
            return bestMax;
        }
        return Math.max(bestMax, total - bestMin);
    }
}
