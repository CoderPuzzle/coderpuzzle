import java.util.HashSet;
import java.util.Set;

class Solution {

    public int minOperations(int[] nums, int[] target) {
        // Choosing x rewrites exactly the cells whose current value is x
        // (all maximal x-segments land on their target values), so a
        // mismatched cell keeps its value until an operation names that
        // value. Naming a value clears its whole mismatch class; no other
        // cell moves. The answer is the number of classes: distinct nums[i]
        // where it differs from target[i]. The count is at most n <= 1e5,
        // so int is always safe here.
        Set<Integer> distinct = new HashSet<>();
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] != target[i]) {
                distinct.add(nums[i]);
            }
        }
        return distinct.size();
    }
}
