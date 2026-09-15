class Solution {

    private int[] memo;

    public int rob(int[] nums) {
        // Top-down mirror of the rolling DP: best(i) = max loot from house i
        // onward. memo[i] caches it (-1 = not computed yet); n <= 100 keeps
        // the recursion depth trivially safe.
        memo = new int[nums.length];
        java.util.Arrays.fill(memo, -1);
        return best(nums, 0);
    }

    private int best(int[] nums, int i) {
        // Past the last house there is nothing left to take.
        if (i >= nums.length) {
            return 0;
        }
        if (memo[i] < 0) {
            // Rob house i (so i+1 is off limits) or skip it.
            memo[i] = Math.max(nums[i] + best(nums, i + 2), best(nums, i + 1));
        }
        return memo[i];
    }
}
