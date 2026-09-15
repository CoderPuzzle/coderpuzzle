import java.util.Arrays;

class Solution {

    public int[] moveZeroes(int[] nums) {
        // Invariant: nums[0..write) is the stabilized prefix of non-zero
        // values in their original order. write never passes the read
        // position, so copying forward cannot clobber an unread value.
        int write = 0;
        for (int value : nums) {
            if (value != 0) {
                nums[write] = value;
                write++;
            }
        }
        // Slots from write onward are settled by decree rather than by
        // exchange: overwrite the whole tail with zeros.
        Arrays.fill(nums, write, nums.length, 0);
        return nums;
    }
}
