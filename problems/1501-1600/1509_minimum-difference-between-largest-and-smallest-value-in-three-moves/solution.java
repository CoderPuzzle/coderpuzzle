import java.util.Arrays;

class Solution {

    public int minDifference(int[] nums) {
        int n = nums.length;
        // Four or fewer elements can all be pulled to one value in at most
        // three moves.
        if (n <= 4) {
            return 0;
        }
        Arrays.sort(nums);
        // Try each of the four ways to split three removals between the low
        // end and the high end of the sorted array.
        int best = Integer.MAX_VALUE;
        for (int i = 0; i < 4; ++i) {
            best = Math.min(best, nums[n - 4 + i] - nums[i]);
        }
        return best;
    }
}
