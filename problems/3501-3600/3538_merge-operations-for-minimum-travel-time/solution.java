import java.util.Arrays;

class Solution {

    public int minTravelTime(int l, int n, int k, int[] position, int[] time) {
        final long INF = Long.MAX_VALUE / 4;
        // prefix[t] = sum of time[0..t-1]; merging a run of s removals that
        // sit directly before kept sign i folds time[i-s..i] into its rate.
        // Answers stay <= l * sum(time) <= 1e7, but widen to long anyway.
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; ++i) {
            prefix[i + 1] = prefix[i] + time[i];
        }
        // dp[i][j][s]: sign i kept, j merges spent, s consecutive removals
        // directly before i; the outgoing segment (i -> next kept) is
        // charged when the transition is relaxed.
        long[][][] dp = new long[n][k + 1][k + 1];
        for (long[][] layer : dp) {
            for (long[] row : layer) {
                Arrays.fill(row, INF);
            }
        }
        dp[0][0][0] = 0;
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j <= k; ++j) {
                for (int s = 0; s <= k; ++s) {
                    long base = dp[i][j][s];
                    if (base == INF) continue;
                    long rate = prefix[i + 1] - prefix[i - s];
                    for (int q = i + 1; q < n; ++q) {
                        int d = q - i - 1;
                        if (j + d > k) break;
                        long cost = base + (long) (position[q] - position[i]) * rate;
                        if (cost < dp[q][j + d][d]) dp[q][j + d][d] = cost;
                    }
                }
            }
        }
        long best = INF;
        for (int s = 0; s <= k; ++s) best = Math.min(best, dp[n - 1][k][s]);
        return (int) best;
    }
}
