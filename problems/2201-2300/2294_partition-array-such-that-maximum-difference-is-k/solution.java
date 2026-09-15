import java.util.*;

class Solution {

    public int partitionArray(int[] nums, int k) {
        Arrays.sort(nums);
        int groups = 1;
        int start = nums[0];
        for (int value : nums) {
            if (value - start > k) {
                groups++;
                start = value;
            }
        }
        return groups;
    }
}
