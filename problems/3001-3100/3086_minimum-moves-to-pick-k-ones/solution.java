class Solution {

    public long minimumMoves(int[] nums, int k, int maxChanges) {
        int n = nums.length;
        // 1-indexed positions of ones
        long[] ones = new long[n + 1];
        long[] prefix = new long[n + 1];
        int m = 0;
        for (int i = 0; i < n; i++) {
            if (nums[i] != 0) {
                m++;
                ones[m] = i;
                prefix[m] = prefix[m - 1] + i;
            }
        }
        final long INF = Long.MAX_VALUE / 4;

        long lo = Math.max(0, (long) k - maxChanges);
        long hi = Math.min((long) k, (long) m);
        if (lo > hi) {
            return 0;
        }
        while (hi - lo > 4) {
            long m1 = lo + (hi - lo) / 3;
            long m2 = hi - (hi - lo) / 3;
            if (total((int) m1, k, ones, prefix, m, INF) <= total((int) m2, k, ones, prefix, m, INF)) {
                hi = m2;
            } else {
                lo = m1;
            }
        }
        long ans = INF;
        for (long t = lo; t <= hi; t++) {
            long v = total((int) t, k, ones, prefix, m, INF);
            if (v < ans) {
                ans = v;
            }
        }
        return ans;
    }

    private long total(int t, int k, long[] ones, long[] prefix, int m, long INF) {
        long wc = windowCost(t, ones, prefix, m, INF);
        if (wc == INF) {
            return INF;
        }
        return wc + 2L * (k - t);
    }

    private long windowCost(int t, long[] ones, long[] prefix, int m, long INF) {
        if (t == 0) {
            return 0;
        }
        if (t > m) {
            return INF;
        }
        long best = INF;
        for (int l = 1; l <= m - t + 1; l++) {
            int r = l + t - 1;
            int pos = (l + r) / 2;
            long leftCnt = pos - l;
            long rightCnt = r - pos;
            long left = leftCnt * ones[pos] - (prefix[pos - 1] - prefix[l - 1]);
            long right = prefix[r] - prefix[pos] - rightCnt * ones[pos];
            long cost = left + right;
            if (cost < best) {
                best = cost;
            }
        }
        return best;
    }
}
