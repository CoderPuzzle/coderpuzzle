import java.util.HashMap;
import java.util.Map;

class Solution {

    public int subarraySum(int[] nums, int k) {
        Map<Integer, Integer> prefixCounts = new HashMap<>();
        // Seed with the empty prefix so subarrays starting at index 0 are counted.
        prefixCounts.put(0, 1);
        int running = 0;
        int total = 0;
        for (int value : nums) {
            running += value;
            // Subarrays ending here sum to k exactly when an earlier prefix equals running - k.
            total += prefixCounts.getOrDefault(running - k, 0);
            // Record only after counting, so a subarray never matches against itself.
            prefixCounts.merge(running, 1, Integer::sum);
        }
        return total;
    }
}
