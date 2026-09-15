import java.util.Arrays;

class Solution {

    public int smallestRangeII(int[] nums, int k) {
        // Sorted, a best plan lifts a prefix by k and lowers the rest by k;
        // everyone moving together just keeps the raw span.
        Arrays.sort(nums);
        int n = nums.length;
        int best = nums[n - 1] - nums[0];
        for (int i = 1; i < n; ++i) {
            // Cut after i elements: the extremes can only be the four
            // boundary values around the cut.
            int high = Math.max(nums[i - 1] + k, nums[n - 1] - k);
            int low = Math.min(nums[0] + k, nums[i] - k);
            best = Math.min(best, high - low);
        }
        return best;
    }
}
