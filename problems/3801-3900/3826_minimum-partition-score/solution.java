class Solution {

    public long minPartitionScore(int[] nums, int k) {
        // Bounds: n <= 1000 and nums[i] <= 10^4, so every prefix sum is at
        // most 10^7 and every subarray value s*(s+1)/2 at most ~5*10^13 —
        // everything lives comfortably in a long.
        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) {
            prefix[i + 1] = prefix[i] + nums[i];
        }

        // dp over "exactly j subarrays covering the first i elements".
        // Layer j only needs i in [j, n-k+j]: at least j elements for j
        // blocks, and at least one element per remaining k-j blocks.
        if (k == 1) {
            return (prefix[n] * (prefix[n] + 1)) / 2;
        }
        long[] prev = new long[n + 1];
        long[] cur = new long[n + 1];
        for (int i = 1; i <= n - k + 1; i++) {
            prev[i] = (prefix[i] * (prefix[i] + 1)) / 2;
        }

        for (int j = 2; j <= k; j++) {
            solve(j, n - k + j, j - 1, n - k + j - 1, prefix, prev, cur);
            long[] swap = prev;
            prev = cur;
            cur = swap;
        }
        return prev[n];
    }

    // The cost prev[t] + value(P[i]-P[t]) satisfies the quadrangle
    // inequality because value is convex, so the best split point is
    // non-decreasing in i: search [optLo, optHi] only, and recurse with
    // the found point splitting the candidate range.
    private void solve(int lo, int hi, int optLo, int optHi, long[] prefix, long[] prev, long[] cur) {
        if (lo > hi) {
            return;
        }
        int mid = (lo + hi) >>> 1;
        long best = Long.MAX_VALUE;
        int bestT = optLo;
        int hiT = Math.min(optHi, mid - 1);
        long pMid = prefix[mid];
        for (int t = optLo; t <= hiT; t++) {
            long s = pMid - prefix[t];
            long v = prev[t] + (s * (s + 1)) / 2;
            if (v < best) {
                best = v;
                bestT = t;
            }
        }
        cur[mid] = best;
        solve(lo, mid - 1, optLo, bestT, prefix, prev, cur);
        solve(mid + 1, hi, bestT, optHi, prefix, prev, cur);
    }
}
