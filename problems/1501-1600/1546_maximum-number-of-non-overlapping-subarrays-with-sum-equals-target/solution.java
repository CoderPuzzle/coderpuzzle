import java.util.HashSet;
import java.util.Set;

class Solution {

    public int maxNonOverlapping(int[] nums, int target) {
        // `seen` holds every prefix sum reachable from the start of the
        // current "segment" (the region after the last subarray taken).
        // The moment the running sum minus `target` is in `seen`, a
        // subarray ending here sums to `target`; taking it immediately and
        // resetting (prefix sum back to 0, `seen` back to just {0}) is
        // optimal, because closing off a valid subarray as early as
        // possible never removes an opportunity a later close would have
        // had — it can only free up more room for subarrays after it.
        // `prefixSum` is a long: up to 10^5 terms each up to 10^4 in
        // magnitude can sum to roughly 10^9, close enough to the int32
        // range to be worth avoiding.
        Set<Long> seen = new HashSet<>();
        seen.add(0L);
        long prefixSum = 0;
        int count = 0;
        for (int x : nums) {
            prefixSum += x;
            if (seen.contains(prefixSum - target)) {
                count++;
                seen.clear();
                seen.add(0L);
                prefixSum = 0;
            } else {
                seen.add(prefixSum);
            }
        }
        return count;
    }
}
