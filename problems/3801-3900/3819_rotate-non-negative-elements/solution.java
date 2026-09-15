import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] rotateElements(int[] nums, int k) {
        // Gather the non-negative values in scan order, compute the effective
        // left shift k % m once, then scatter values[(j + shift) % m] into the
        // j-th originally non-negative slot — negatives are never touched.
        List<Integer> values = new ArrayList<>();
        for (int value : nums) {
            if (value >= 0) {
                values.add(value);
            }
        }
        int m = values.size();
        int[] result = nums.clone();
        if (m == 0) {
            return result;
        }
        int shift = k % m;
        int at = 0;
        for (int index = 0; index < nums.length; index++) {
            if (nums[index] >= 0) {
                result[index] = values.get((at + shift) % m);
                at++;
            }
        }
        return result;
    }
}
