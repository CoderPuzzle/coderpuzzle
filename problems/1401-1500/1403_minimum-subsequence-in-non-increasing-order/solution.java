import java.util.Arrays;

class Solution {

    public int[] minSubsequence(int[] nums) {
        // The chosen subsequence must sum to more than half the total.
        // Every element is positive, so taking the largest elements first
        // yields the minimum size and, per size, the maximum sum.
        Arrays.sort(nums); // ascending; walk from the back for descending
        int total = 0;
        for (int value : nums) {
            total += value;
        }
        int running = 0;
        for (int i = nums.length - 1; i >= 0; i--) {
            running += nums[i];
            if (running * 2 > total) {
                int[] result = new int[nums.length - i];
                for (int j = 0; j < result.length; j++) {
                    result[j] = nums[nums.length - 1 - j];
                }
                return result;
            }
        }
        return new int[0];
    }
}
