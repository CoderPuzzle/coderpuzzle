import java.util.Arrays;

class Solution {

    public int minimumDifference(int[] nums, int k) {
        // Sort so the k chosen students form a contiguous window; the span
        // of that window is its highest minus lowest score.
        Arrays.sort(nums);
        int best = nums[k - 1] - nums[0];
        for (int i = k; i < nums.length; ++i) {
            best = Math.min(best, nums[i] - nums[i - k + 1]);
        }
        return best;
    }
}
