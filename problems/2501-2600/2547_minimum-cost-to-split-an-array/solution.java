import java.util.HashMap;
import java.util.Map;

class Solution {

    public long minCost(int[] nums, int k) {
        // dp[r] = min cost to split the first r elements. For each r,
        // sweep l downward from r-1 while extending one frequency
        // table: a value seen for the first time adds nothing, its
        // second occurrence adds 2 to the trimmed length (the missed
        // first occurrence plus this one), later ones add 1 each.
        // Costs reach n*(k+n) ~ 10^12, past int range — longs throughout.
        int n = nums.length;
        long[] dp = new long[n + 1];
        java.util.Arrays.fill(dp, 1, n + 1, Long.MAX_VALUE);
        for (int r = 1; r <= n; ++r) {
            Map<Integer, Integer> freq = new HashMap<>();
            long trimmed = 0;
            long best = Long.MAX_VALUE;
            for (int l = r - 1; l >= 0; --l) {
                int count = freq.merge(nums[l], 1, Integer::sum);
                if (count == 2) {
                    trimmed += 2;
                } else if (count > 2) {
                    ++trimmed;
                }
                best = Math.min(best, dp[l] + k + trimmed);
            }
            dp[r] = best;
        }
        return dp[n];
    }
}
