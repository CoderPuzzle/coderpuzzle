import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[] findDuplicates(int[] nums) {
        // Values in [1, n] let the array index itself be the hash: value v
        // maps to slot v-1, and flipping that slot's sign records "v seen".
        // A slot already negative means |v| was visited before: a duplicate.
        List<Integer> duplicates = new ArrayList<>();
        for (int value : nums) {
            int index = Math.abs(value) - 1;
            if (nums[index] < 0) {
                duplicates.add(index + 1);
            } else {
                nums[index] = -nums[index];
            }
        }
        // Restore every sign so the array is left as it was found, then emit
        // the ascending order this judge pins on the original's any-order
        // freedom.
        for (int index = 0; index < nums.length; ++index) {
            nums[index] = Math.abs(nums[index]);
        }
        int[] result = new int[duplicates.size()];
        for (int index = 0; index < result.length; ++index) {
            result[index] = duplicates.get(index);
        }
        Arrays.sort(result);
        return result;
    }
}
