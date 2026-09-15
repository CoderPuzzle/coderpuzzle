import java.util.HashSet;
import java.util.Set;

class Solution {

    public int missingInteger(int[] nums) {
        // The floor of the answer is the sum of the longest prefix in which
        // every value is exactly its predecessor plus one; the first break
        // in that progression ends the prefix, so one scan settles it.
        int total = nums[0];
        for (int i = 1; i < nums.length; ++i) {
            if (nums[i] != nums[i - 1] + 1) break;
            total += nums[i];
        }
        // From that floor, step upward past every value the array holds;
        // the first gap is the smallest missing integer.
        Set<Integer> present = new HashSet<>();
        for (int v : nums) {
            present.add(v);
        }
        while (present.contains(total)) {
            total += 1;
        }
        return total;
    }
}
