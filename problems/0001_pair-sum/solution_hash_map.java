import java.util.HashMap;
import java.util.Map;

class Solution {

    public int[] pairSum(int[] nums, int target) {
        // Hash map from value -> index: one pass answers "seen the complement?"
        // in O(1), replacing the nested brute-force scan.
        Map<Integer, Integer> seen = new HashMap<>();
        for (int index = 0; index < nums.length; ++index) {
            // Look up before inserting, so an element can never match itself
            // and the two returned indices are guaranteed distinct.
            Integer earlier = seen.get(target - nums[index]);
            if (earlier != null) return new int[] { earlier, index };
            seen.put(nums[index], index);
        }
        return new int[] {};
    }
}
