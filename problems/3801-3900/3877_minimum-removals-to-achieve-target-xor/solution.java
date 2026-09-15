import java.util.HashMap;
import java.util.Map;

class Solution {

    public int minRemovals(int[] nums, int target) {
        // dp[xor] = maximum number of elements we can KEEP with XOR == xor
        Map<Integer, Integer> dp = new HashMap<>();
        dp.put(0, 0);
        for (int x : nums) {
            Map<Integer, Integer> snapshot = new HashMap<>(dp);
            for (Map.Entry<Integer, Integer> e : snapshot.entrySet()) {
                int nx = e.getKey() ^ x;
                int cand = e.getValue() + 1;
                Integer cur = dp.get(nx);
                if (cur == null || cand > cur) {
                    dp.put(nx, cand);
                }
            }
        }
        Integer best = dp.get(target);
        if (best != null) {
            return nums.length - best;
        }
        return -1;
    }
}
