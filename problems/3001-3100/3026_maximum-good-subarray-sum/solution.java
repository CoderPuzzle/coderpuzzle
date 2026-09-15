import java.util.HashMap;
import java.util.Map;

class Solution {

    public long maximumSubarraySum(int[] nums, int k) {
        Map<Long, Long> best = new HashMap<>(); // value -> minimum prefix sum P[i] for a start i
        best.put((long) nums[0], 0L);
        long prefix = 0;
        Long ans = null;
        int n = nums.length;
        for (int j = 0; j < n; j++) {
            prefix += nums[j]; // P[j+1]
            long v = nums[j];
            long[] candidates = { v - k, v + k };
            for (long candidate : candidates) {
                Long b = best.get(candidate);
                if (b != null) {
                    long value = prefix - b;
                    if (ans == null || value > ans) ans = value;
                }
            }
            if (j + 1 < n) {
                long next = nums[j + 1];
                Long b = best.get(next);
                if (b == null || prefix < b) best.put(next, prefix);
            }
        }
        return ans == null ? 0 : ans;
    }
}
