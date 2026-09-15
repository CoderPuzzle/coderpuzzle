class Solution {

    public int[] buildArray(int[] nums) {
        // One pass of nested indexing: nums is a permutation of 0..n-1, so
        // every value is itself a valid index and nums[nums[i]] is in range.
        int[] ans = new int[nums.length];
        for (int i = 0; i < nums.length; ++i) {
            ans[i] = nums[nums[i]];
        }
        return ans;
    }
}
