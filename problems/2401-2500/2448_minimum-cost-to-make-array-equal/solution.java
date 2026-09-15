class Solution {

    public long minCost(int[] nums, int[] cost) {
        int n = nums.length;
        long[][] pairs = new long[n][2];
        for (int i = 0; i < n; i++) {
            pairs[i][0] = nums[i];
            pairs[i][1] = cost[i];
        }
        java.util.Arrays.sort(pairs, (a, b) -> Long.compare(a[0], b[0]));
        // The cost sum(|nums[i]-t|*cost[i]) is convex piecewise-linear in t;
        // its slope flips where cumulative cost crosses half the total, so
        // the optimum is the weighted median.
        long total = 0;
        for (long[] p : pairs) total += p[1];
        long target = (total + 1) / 2;
        long prefix = 0;
        long median = pairs[n - 1][0];
        // Walk sorted values until the prefix weight reaches ceil(total/2);
        // >= with the +1 picks the lower median on an even split (same cost).
        for (long[] p : pairs) {
            prefix += p[1];
            if (prefix >= target) {
                median = p[0];
                break;
            }
        }
        // Evaluate the convex cost at the median; it lies at a breakpoint
        // (an existing value), so restricting to nums values loses nothing.
        long ans = 0;
        for (long[] p : pairs) {
            ans += Math.abs(p[0] - median) * p[1];
        }
        return ans;
    }
}
