import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] findDisappearedNumbers(int[] nums) {
        // Values in [1, n] let the array index itself be the hash: value v
        // maps to slot v-1, and flipping that slot's sign records "v seen".
        // A value that never appears leaves its slot positive.
        for (int value : nums) {
            int index = Math.abs(value) - 1;
            if (nums[index] > 0) {
                nums[index] = -nums[index];
            }
        }
        // A second sweep reads the marks: slot i positive means i+1 never
        // appeared, so it is collected; negative marks are restored on the
        // way out, leaving the array exactly as it arrived. Index order is
        // value order, so the pinned ascending output is free.
        List<Integer> disappeared = new ArrayList<>();
        for (int index = 0; index < nums.length; ++index) {
            if (nums[index] > 0) {
                disappeared.add(index + 1);
            } else {
                nums[index] = -nums[index];
            }
        }
        int[] result = new int[disappeared.size()];
        for (int index = 0; index < result.length; ++index) {
            result[index] = disappeared.get(index);
        }
        return result;
    }
}
