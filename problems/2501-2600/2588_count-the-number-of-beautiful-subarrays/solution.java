import java.util.HashMap;
import java.util.Map;

class Solution {

    public long beautifulSubarrays(int[] nums) {
        // Each operation clears one set bit in each of two elements, so the
        // XOR of a subarray is invariant; it reduces to all zeros exactly
        // when its XOR is already 0.
        Map<Integer, Long> count = new HashMap<>();
        // Seed with the empty prefix so subarrays starting at index 0 are
        // witnessed when their prefix XOR returns to 0.
        count.put(0, 1L);
        int x = 0;
        long ans = 0;
        for (int v : nums) {
            x ^= v;
            // Subarray (j, i] has XOR prefix[j] ^ prefix[i], which vanishes
            // exactly when the prefixes match: each earlier equal prefix is
            // one beautiful subarray ending here.
            ans += count.getOrDefault(x, 0L);
            count.merge(x, 1L, Long::sum);
        }
        return ans;
    }
}
