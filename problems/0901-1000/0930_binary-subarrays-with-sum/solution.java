import java.util.HashMap;
import java.util.Map;

class Solution {

    public int numSubarraysWithSum(int[] nums, int goal) {
        // A subarray's sum is the difference of two prefix sums, so the
        // windows ending here with sum goal pair exactly with the earlier
        // prefixes worth prefix - goal. A hash map counting each prefix sum
        // seen so far answers that lookup in O(1) per position.
        int count = 0;
        int prefix = 0;
        Map<Integer, Integer> seen = new HashMap<>();
        seen.put(0, 1);
        for (int value : nums) {
            prefix += value;
            count += seen.getOrDefault(prefix - goal, 0);
            seen.merge(prefix, 1, Integer::sum);
        }
        return count;
    }
}
