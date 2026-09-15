import java.util.HashMap;
import java.util.Map;

class Solution {

    public int findTargetSumWays(int[] nums, int target) {
        // dp maps each reachable running sum to the number of sign
        // assignments producing it; one way to stand at 0 before any number.
        Map<Integer, Integer> dp = new HashMap<>();
        dp.put(0, 1);
        for (int value : nums) {
            // Each reachable total branches into +value and -value;
            // identical totals merge and their counts add, so the map stays
            // bounded by distinct sums, not 2^i.
            Map<Integer, Integer> nxt = new HashMap<>();
            for (Map.Entry<Integer, Integer> entry : dp.entrySet()) {
                int total = entry.getKey();
                int count = entry.getValue();
                nxt.merge(total + value, count, Integer::sum);
                nxt.merge(total - value, count, Integer::sum);
            }
            dp = nxt;
        }
        return dp.getOrDefault(target, 0);
    }
}
