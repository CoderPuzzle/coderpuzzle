import java.util.Arrays;

class Solution {

    public int findValueOfPartition(int[] nums) {
        // A partition's value is the distance between one cross-side pair: the
        // largest element of nums1 against the smallest of nums2. No partition
        // can beat the closest two values in the whole array, and a split
        // around that closest sorted pair realizes it exactly.
        Arrays.sort(nums);
        int best = Integer.MAX_VALUE;
        for (int i = 1; i < nums.length; ++i) {
            // Values are at most 10^9 apart, so every gap fits an int as is.
            best = Math.min(best, nums[i] - nums[i - 1]);
        }
        return best;
    }
}
