import java.util.Arrays;

class Solution {

    public double minimumAverage(int[] nums) {
        // Every round pairs the current minimum with the current maximum;
        // after sorting, those are exactly nums[k] and nums[n-1-k]. Sums
        // stay <= 100 — far inside int — and the single division by 2 at
        // double precision is exact because a pair sum of two integers in
        // 1..50 is either even or exactly one past an even number.
        Arrays.sort(nums);
        int n = nums.length;
        double best = Double.MAX_VALUE;
        for (int k = 0; k < n / 2; k++) {
            best = Math.min(best, (nums[k] + nums[n - 1 - k]) / 2.0);
        }
        return best;
    }
}
