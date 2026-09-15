class Solution {

    // Paint equidistant pairs (k, n-1-k) outside-in. dp[a][b] is the
    // cheapest way to paint every pair so far, ending with outer colors
    // (a, b) — 9 states, because a pair only constrains the two houses
    // it touches in the next pair. Totals reach 10^10, past 32-bit.
    public long minCost(int n, int[][] cost) {
        final long INF = Long.MAX_VALUE / 4;
        long[][] dp = new long[3][3];
        for (int a = 0; a < 3; a++) {
            for (int b = 0; b < 3; b++) {
                dp[a][b] = a == b ? INF : (long) cost[0][a] + cost[n - 1][b];
            }
        }
        for (int k = 1; k < n / 2; k++) {
            int[] left = cost[k];
            int[] right = cost[n - 1 - k];
            // e[t][c]: best dp[t][b] over b != c — the previous right house
            // must differ from the new right one (adjacency on that side)
            long[][] e = new long[3][3];
            for (int t = 0; t < 3; t++) {
                e[t][0] = Math.min(dp[t][1], dp[t][2]);
                e[t][1] = Math.min(dp[t][0], dp[t][2]);
                e[t][2] = Math.min(dp[t][0], dp[t][1]);
            }
            long[][] next = new long[3][3];
            for (int a = 0; a < 3; a++) {
                for (int b = 0; b < 3; b++) {
                    // the diagonal stays unreachable: a pair's two houses
                    // are mirrors of each other and may not share a color
                    if (a == b) {
                        next[a][b] = INF;
                        continue;
                    }
                    long best = INF;
                    // drop left color a so the new left house differs from
                    // the old one; column b was already excluded in e
                    for (int t = 0; t < 3; t++) {
                        if (t != a) {
                            best = Math.min(best, e[t][b]);
                        }
                    }
                    next[a][b] = best + left[a] + right[b];
                }
            }
            dp = next;
        }
        long answer = INF;
        for (int a = 0; a < 3; a++) {
            for (int b = 0; b < 3; b++) {
                answer = Math.min(answer, dp[a][b]);
            }
        }
        return answer;
    }
}
