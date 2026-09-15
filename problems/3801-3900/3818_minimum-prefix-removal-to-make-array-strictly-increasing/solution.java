class Solution {

    public int minimumPrefixLength(int[] nums) {
        // Every element fits in int and the answer never exceeds
        // nums.length - 1 <= 10^5 - 1, so int arithmetic carries
        // everything here. What survives removal is a suffix, and a
        // suffix is strictly increasing exactly when none of its adjacent
        // pairs violates the order, so the best cut sits just past the
        // LAST violating pair.
        for (int i = nums.length - 2; i >= 0; i--) {
            if (nums[i] >= nums[i + 1]) {
                return i + 1;
            }
        }
        return 0;
    }
}
