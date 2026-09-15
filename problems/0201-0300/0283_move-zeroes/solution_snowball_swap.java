class Solution {

    public int[] moveZeroes(int[] nums) {
        // Invariant: nums[0..slow) is the stabilized prefix of non-zero
        // values in their original order; nums[slow..fast] holds only zeros.
        int slow = 0;
        for (int fast = 0; fast < nums.length; fast++) {
            if (nums[fast] != 0) {
                // Swap the non-zero into its slot. While slow == fast (no
                // zeros seen yet) this is a self-exchange, so each element
                // moves at most once.
                int tmp = nums[slow];
                nums[slow] = nums[fast];
                nums[fast] = tmp;
                slow++;
            }
        }
        return nums;
    }
}
