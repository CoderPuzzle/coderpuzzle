import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] findValidElements(int[] nums) {
        int[] leftMax = nums.clone();
        for (int i = 1; i < nums.length; i++) {
            leftMax[i] = Math.max(leftMax[i - 1], nums[i]);
        }
        int[] rightMax = nums.clone();
        for (int i = nums.length - 2; i >= 0; i--) {
            rightMax[i] = Math.max(rightMax[i + 1], nums[i]);
        }

        List<Integer> valid = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            if (i == 0 || i == nums.length - 1 || nums[i] > leftMax[i - 1] || nums[i] > rightMax[i + 1]) {
                valid.add(nums[i]);
            }
        }
        return valid.stream().mapToInt(Integer::intValue).toArray();
    }
}
