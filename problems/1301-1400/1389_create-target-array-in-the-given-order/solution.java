import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] createTargetArray(int[] nums, int[] index) {
        // Direct simulation: each step splices nums[i] into the growing
        // list at position index[i], pushing the tail right. index[i] <= i
        // keeps every insertion inside the array built so far.
        List<Integer> target = new ArrayList<>();
        for (int i = 0; i < nums.length; ++i) {
            target.add(index[i], nums[i]);
        }
        int[] result = new int[target.size()];
        for (int i = 0; i < result.length; ++i) {
            result[i] = target.get(i);
        }
        return result;
    }
}
