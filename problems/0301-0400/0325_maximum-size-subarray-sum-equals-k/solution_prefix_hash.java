import java.util.HashMap;
import java.util.Map;

class Solution {

    public int maxSubArrayLen(int[] nums, int k) {
        // first[prefix] = earliest index that prefix value occurred; the
        // seed 0: -1 lets a subarray starting at index 0 be found.
        Map<Long, Integer> first = new HashMap<>();
        first.put(0L, -1);
        long acc = 0;
        int best = 0;
        for (int i = 0; i < nums.length; ++i) {
            acc += nums[i];
            // Subarray (j, i] sums to k exactly when the earlier prefix
            // equals acc - k; earliest j gives the longest subarray.
            Integer j = first.get(acc - (long) k);
            if (j != null && i - j > best) {
                best = i - j;
            }
            // Keep only the first occurrence per prefix value — a later
            // duplicate would only shorten future subarrays.
            first.putIfAbsent(acc, i);
        }
        return best;
    }
}
