class Solution {

    public int waysToSplitArray(int[] nums) {
        // A rolling prefix sum plus the precomputed total decides each split
        // in O(1); the right half is simply total - prefix. Prefix sums reach
        // +/-1e10 here, so they stay long.
        long total = 0;
        for (int x : nums) {
            total += x;
        }
        long prefix = 0;
        int count = 0;
        for (int i = 0; i + 1 < nums.length; ++i) {
            prefix += nums[i];
            if (prefix >= total - prefix) {
                ++count;
            }
        }
        return count;
    }
}
