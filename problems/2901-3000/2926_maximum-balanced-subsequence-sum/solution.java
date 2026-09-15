import java.util.Arrays;
import java.util.HashMap;
import java.util.Map;

class Solution {

    public long maxBalancedSubsequenceSum(int[] nums) {
        // Balance rearranges to nums[j] - j >= nums[i] - i, so a subsequence
        // is balanced precisely when b[i] = nums[i] - i is non-decreasing
        // along it. Compress b into ranks to key the Fenwick tree.
        int n = nums.length;
        long[] vals = new long[n];
        for (int i = 0; i < n; i++) {
            vals[i] = (long) nums[i] - i;
        }
        long[] comp = vals.clone();
        Arrays.sort(comp);
        int m = 0;
        for (int i = 0; i < n; i++) {
            if (i == 0 || comp[i] != comp[i - 1]) {
                comp[m++] = comp[i];
            }
        }
        Map<Long, Integer> idxOf = new HashMap<>();
        for (int i = 0; i < m; i++) {
            idxOf.put(comp[i], i + 1);
        }

        // Max-flavored Fenwick tree (update propagates dp values upward,
        // query takes the best dp among ranks <= i), initialized to zero —
        // which implements the max(0, ...) cutoff: a single element is
        // always a balanced subsequence, so negative predecessors are
        // ignored and each element may start fresh.
        long[] bit = new long[m + 1];

        long ans = Long.MIN_VALUE;
        for (int i = 0; i < n; i++) {
            // dp[i] = nums[i] + best predecessor dp with rank <= j. Ties are
            // fine since equal b values satisfy the rearranged inequality,
            // so the query includes i's own rank.
            int j = idxOf.get(vals[i]);
            long best = query(bit, j);
            long dp = best <= 0 ? nums[i] : nums[i] + best;
            if (dp > ans) {
                ans = dp;
            }
            update(bit, j, dp);
        }
        return ans;
    }

    private void update(long[] bit, int i, long value) {
        int m = bit.length - 1;
        while (i <= m) {
            if (value > bit[i]) {
                bit[i] = value;
            }
            i += i & -i;
        }
    }

    private long query(long[] bit, int i) {
        long best = 0;
        while (i > 0) {
            if (bit[i] > best) {
                best = bit[i];
            }
            i -= i & -i;
        }
        return best;
    }
}
