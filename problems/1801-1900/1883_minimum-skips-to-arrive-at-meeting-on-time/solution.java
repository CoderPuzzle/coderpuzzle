class Solution {

    // dp[j] = smallest accumulated time (in distance units) after the
    // current road with j skips used; rests already rounded. Rest:
    // ceil((t+d)/speed)*speed at same j; skip: t+d at j+1.
    public int minSkips(int[] dist, int speed, int hoursBefore) {
        int n = dist.length;
        long INF = Long.MAX_VALUE / 4;
        long[] dp = new long[n + 1];
        java.util.Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            long d = dist[i];
            long[] ndp = new long[n + 1];
            java.util.Arrays.fill(ndp, INF);
            if (i == n - 1) {
                for (int j = 0; j <= n; j++) {
                    if (dp[j] < INF && dp[j] + d < ndp[j]) {
                        ndp[j] = dp[j] + d;
                    }
                }
            } else {
                for (int j = 0; j < n; j++) {
                    long t = dp[j];
                    if (t >= INF) {
                        continue;
                    }
                    long arr = t + d;
                    if (arr < ndp[j + 1]) {
                        ndp[j + 1] = arr;
                    }
                    long rested = ((arr + speed - 1) / speed) * speed;
                    if (rested < ndp[j]) {
                        ndp[j] = rested;
                    }
                }
            }
            dp = ndp;
        }
        for (int j = 0; j <= n; j++) {
            if (dp[j] < INF && dp[j] <= (long) hoursBefore * speed) {
                return j;
            }
        }
        return -1;
    }
}
