import java.util.Arrays;

class Solution {

    public long minimumFinishTime(int[][] tires, int changeTime, int numLaps) {
        // Precompute best[x]: the cheapest time for x consecutive laps on
        // a single tire. A run never helps once its next lap costs more
        // than resetting to the fastest first lap; ratios are >= 2 so the
        // useful run length is tiny.
        final long INF = 1L << 62;
        int fastestFirst = Integer.MAX_VALUE;
        for (int[] tire : tires) {
            fastestFirst = Math.min(fastestFirst, tire[0]);
        }
        long[] best = new long[numLaps + 1];
        Arrays.fill(best, INF);
        for (int[] tire : tires) {
            long fi = tire[0];
            long ri = tire[1];
            long total = 0;
            long lap = fi;
            for (int x = 1; x <= numLaps; ++x) {
                total += lap;
                best[x] = Math.min(best[x], total);
                if (lap >= changeTime + fastestFirst || total > INF / ri) {
                    break;
                }
                lap *= ri;
            }
        }
        long[] dp = new long[numLaps + 1];
        Arrays.fill(dp, INF);
        dp[0] = 0;
        for (int i = 1; i <= numLaps; ++i) {
            for (int x = 1; x <= i; ++x) {
                if (best[x] == INF) {
                    continue;
                }
                long candidate = dp[i - x] + best[x];
                if (i != x) {
                    candidate += changeTime;
                }
                dp[i] = Math.min(dp[i], candidate);
            }
        }
        return dp[numLaps];
    }
}
