import java.util.*;

class Solution {

    public int minCost(int n, int[] cuts) {
        int[] positions = new int[cuts.length + 2];
        System.arraycopy(cuts, 0, positions, 0, cuts.length);
        positions[cuts.length] = 0;
        positions[cuts.length + 1] = n;
        // Sorting matters: the cutting order is free while the input order
        // is not, and the sentinel endpoints make the outermost segments
        // uniform.
        Arrays.sort(positions);
        int size = positions.length;
        // dp[i][j]: minimum cost of all cuts strictly between boundaries i
        // and j; adjacent boundaries (no interior cut) stay 0.
        int[][] dp = new int[size][size];
        // Fill by increasing segment length so both subproblems of an
        // interval are already solved when it needs them.
        for (int length = 2; length < size; length++) {
            for (int i = 0; i + length < size; i++) {
                int j = i + length;
                int best = Integer.MAX_VALUE;
                // Try every interior boundary as the first cut: it splits
                // the segment into independent subproblems and costs the
                // segment's full length.
                for (int k = i + 1; k < j; k++) {
                    if (dp[i][k] + dp[k][j] < best) best = dp[i][k] + dp[k][j];
                }
                dp[i][j] = best + (positions[j] - positions[i]);
            }
        }
        return dp[0][size - 1];
    }
}
