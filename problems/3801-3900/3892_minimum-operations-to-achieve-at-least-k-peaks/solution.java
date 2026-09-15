import java.util.Arrays;

class Solution {

    public long minOperations(int[] nums, int k) {
        // A peak's two neighbours (circular) can never themselves be peaks, so
        // they keep their original values and making position i a peak costs
        // max(0, max(prev, nxt) + 1 - nums[i]) with original neighbour values.
        int n = nums.length;
        if (k == 0) return 0;
        if (k > n / 2) return -1; // a circle admits at most floor(n/2) peaks
        final long INF = (long) 4e18;
        long[] c = new long[n];
        for (int i = 1; i < n; i++) {
            int prev = i >= 2 ? nums[i - 1] : nums[0];
            int nxt = i <= n - 2 ? nums[i + 1] : nums[0];
            c[i] = Math.max(0, Math.max(prev, nxt) + 1L - nums[i]);
        }
        long cost0 = Math.max(0, Math.max(nums[n - 1], nums[1]) + 1L - nums[0]);
        long ansA = cost0 + linear(n, c, Math.max(0, k - 1), true, true);
        long ansB = linear(n, c, k, false, false);
        long ans = Math.min(ansA, ansB);
        return ans >= INF ? -1 : ans;
    }

    // Capped knapsack over positions 1..n-1: notPeak[j]/peak[j] are the cheapest
    // ways to reach j peaks (j == cap means "at least cap") with the current
    // position left unpicked / picked.
    private long linear(int n, long[] c, int cap, boolean forceStart, boolean forceEnd) {
        final long INF = (long) 4e18;
        long[] notPeak = new long[cap + 1];
        long[] peak = new long[cap + 1];
        Arrays.fill(notPeak, INF);
        Arrays.fill(peak, INF);
        notPeak[0] = 0;
        if (!forceStart && cap >= 1) peak[1] = c[1];
        for (int i = 2; i < n; i++) {
            long[] newNot = new long[cap + 1];
            long[] newPeak = new long[cap + 1];
            Arrays.fill(newPeak, INF);
            for (int j = 0; j <= cap; j++) {
                newNot[j] = Math.min(notPeak[j], peak[j]);
            }
            // A peak needs the previous position unpicked; over cap, extra peaks
            // stay folded into the top cell.
            if (!(i == n - 1 && forceEnd)) {
                long base = c[i];
                for (int j = 1; j < cap; j++) {
                    long v = notPeak[j - 1];
                    if (v < INF) newPeak[j] = v + base;
                }
                if (cap >= 1) {
                    long v = Math.min(notPeak[cap - 1], notPeak[cap]);
                    if (v < INF) newPeak[cap] = v + base;
                }
            }
            notPeak = newNot;
            peak = newPeak;
        }
        return Math.min(notPeak[cap], peak[cap]);
    }
}
