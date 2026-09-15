import java.util.HashMap;
import java.util.Map;

class Solution {

    public boolean partitionArray(int[] nums, int k) {
        // Whole groups of exactly k require n to divide evenly, and each
        // occurrence of a value consumes a group of its own, so no value may
        // occur more often than the number of groups.
        int n = nums.length;
        if (n % k != 0) {
            return false;
        }
        Map<Integer, Integer> count = new HashMap<>();
        int mostFrequent = 0;
        for (int value : nums) {
            int seen = count.merge(value, 1, Integer::sum);
            mostFrequent = Math.max(mostFrequent, seen);
        }
        return mostFrequent <= n / k;
    }
}
