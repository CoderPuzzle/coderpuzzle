import java.util.ArrayList;
import java.util.List;

class Solution {

    public int minimumIncompatibility(int[] nums, int k) {
        // Every group has exactly n/k elements and no repeated value, so a
        // group is a set of n/k indices whose values are pairwise distinct —
        // and with values in 1..n, distinctness is itself a 16-bit check.
        // Precompute every valid group once, with cost max - min, bucketed
        // under each index it contains, then run a DP over bitmasks of
        // undistributed elements: each state removes the group covering its
        // lowest remaining index, which collapses the k! orderings of one
        // partition, and a full mask no group ever reaches is the -1 case.
        int n = nums.length;
        int size = n / k;
        int total = 1 << n;
        List<int[]>[] buckets = new ArrayList[n];
        for (int i = 0; i < n; i++) buckets[i] = new ArrayList<>();
        for (int g = 0; g < total; g++) {
            if (Integer.bitCount(g) != size) continue;
            int seen = 0,
                lo = n + 1,
                hi = 0;
            boolean valid = true;
            for (int i = 0; i < n; i++) {
                if (((g >> i) & 1) == 0) continue;
                int vbit = 1 << (nums[i] - 1);
                if ((seen & vbit) != 0) {
                    valid = false;
                    break;
                }
                seen |= vbit;
                lo = Math.min(lo, nums[i]);
                hi = Math.max(hi, nums[i]);
            }
            if (!valid) continue;
            int cost = hi - lo;
            for (int i = 0; i < n; i++) {
                if (((g >> i) & 1) != 0) buckets[i].add(new int[] { g, cost });
            }
        }
        final int INF = 1_000_000;
        int[] dp = new int[total];
        dp[0] = 0;
        for (int mask = 1; mask < total; mask++) {
            dp[mask] = INF;
            if (Integer.bitCount(mask) % size != 0) continue;
            int best = INF;
            for (int[] entry : buckets[Integer.numberOfTrailingZeros(mask)]) {
                int g = entry[0];
                if ((g & mask) == g) best = Math.min(best, dp[mask ^ g] + entry[1]);
            }
            dp[mask] = best;
        }
        return dp[total - 1] >= INF ? -1 : dp[total - 1];
    }
}
