import java.util.Arrays;

class Solution {

    private static final int INF = 1_000_000;

    public int connectTwoGroups(int[][] cost) {
        int size1 = cost.length,
            size2 = cost[0].length;
        int full = 1 << size2;

        // minToReach[j]: cheapest single edge that reaches second-group
        // point j from ANY first-group point, used to force coverage of
        // whichever second-group points the forward pass leaves untouched.
        int[] minToReach = new int[size2];
        Arrays.fill(minToReach, INF);
        for (int j = 0; j < size2; ++j) {
            for (int i = 0; i < size1; ++i) {
                minToReach[j] = Math.min(minToReach[j], cost[i][j]);
            }
        }

        // dp[mask]: cheapest way to finish connecting everything once the
        // first-group points placed so far have reached exactly `mask`.
        // Seed with no first-group points left to place: every second-group
        // point missing from mask must be force-connected at its own
        // cheapest edge.
        int[] dp = new int[full];
        for (int mask = 0; mask < full; ++mask) {
            int total = 0;
            for (int j = 0; j < size2; ++j) {
                if (((mask >> j) & 1) == 0) total += minToReach[j];
            }
            dp[mask] = total;
        }

        for (int i = size1 - 1; i >= 0; --i) {
            int[] next = new int[full];
            Arrays.fill(next, INF);
            for (int mask = 0; mask < full; ++mask) {
                for (int j = 0; j < size2; ++j) {
                    int candidate = cost[i][j] + dp[mask | (1 << j)];
                    if (candidate < next[mask]) next[mask] = candidate;
                }
            }
            dp = next;
        }

        return dp[0];
    }
}
