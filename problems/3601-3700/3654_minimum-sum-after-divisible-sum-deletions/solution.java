import java.util.HashMap;
import java.util.Map;

class Solution {

    public long minArraySum(int[] nums, int k) {
        // A block sums to a multiple of k exactly when its endpoint prefix
        // sums share a remainder mod k, and any deletion sequence collapses
        // to disjoint divisible-sum blocks of the original array.
        Map<Integer, Long> best = new HashMap<>();
        best.put(0, 0L);
        // dp: min surviving sum over the elements processed so far. Totals
        // reach 1e11, hence long throughout.
        long dp = 0;
        long prefix = 0;
        for (int value : nums) {
            // Keep this element...
            long cand = dp + value;
            prefix += value;
            // ...or delete back to the nearest same-remainder prefix, which
            // leaves that prefix's surviving sum untouched.
            int r = (int) (prefix % k);
            Long seen = best.get(r);
            if (seen != null && seen < cand) {
                cand = seen;
            }
            dp = cand;
            // Insert after the lookup so the empty block never registers.
            Long cur = best.get(r);
            if (cur == null || dp < cur) {
                best.put(r, dp);
            }
        }
        return dp;
    }
}
