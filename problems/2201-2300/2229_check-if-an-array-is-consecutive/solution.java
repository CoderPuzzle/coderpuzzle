import java.util.Arrays;

class Solution {

    public boolean isConsecutive(int[] nums) {
        Arrays.sort(nums);
        for (int i = 1; i < nums.length; i++) {
            if (nums[i] - nums[i - 1] != 1) {
                return false;
            }
        }
        return true;
    }
}
