import java.util.HashMap;
import java.util.Map;

class Solution {

    public long countStableSubarrays(int[] capacity) {
        int n = capacity.length;
        // Prefix sums reach n * 10^9 = 10^14, well past 32 bits, so they
        // accumulate in 64-bit integers even though each element fits.
        long[] prefix = new long[n];
        prefix[0] = capacity[0];
        for (int i = 1; i < n; i++) {
            prefix[i] = prefix[i - 1] + capacity[i];
        }
        // With p the inclusive prefix sums, [l, r] is stable exactly when
        // (capacity[l], p[l]) equals (capacity[r], p[r - 1] - capacity[r]):
        // equal boundary values, and an interior sum that reduces to plain
        // prefix equality. The pair spans more than 64 bits together, so it
        // nests as two map levels instead of packing into one key.
        Map<Long, Map<Long, Long>> seen = new HashMap<>();
        long count = 0;
        for (int r = 2; r < n; r++) {
            int left = r - 2;
            seen.computeIfAbsent((long) capacity[left], k -> new HashMap<>()).merge(prefix[left], 1L, Long::sum);
            Map<Long, Long> bucket = seen.get((long) capacity[r]);
            if (bucket != null) {
                count += bucket.getOrDefault(prefix[r - 1] - capacity[r], 0L);
            }
        }
        return count;
    }
}
