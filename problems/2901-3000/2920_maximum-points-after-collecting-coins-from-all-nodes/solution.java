import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    // dp[v][t] = best points from v's subtree when t ancestral halvings
    // already apply to coins[v]. Halving composes with the shift and
    // coins <= 10^4 < 2^14 die after 14 halvings, so the table is 15
    // wide. The total reaches n * max(coins) = 10^9, kept in long for
    // headroom. Traversal is iterative: a path tree is 10^5 deep.
    public long maximumPoints(int[][] edges, int[] coins, int k) {
        int n = coins.length;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        // Root at 0 once: BFS fixes parents and a top-down visit order,
        // so every later pass walks flat arrays and nothing recurses.
        int[] parent = new int[n];
        Arrays.fill(parent, -1);
        int[] order = new int[n];
        int cnt = 0;
        order[cnt++] = 0;
        for (int idx = 0; idx < cnt; idx++) {
            int u = order[idx];
            for (int v : adj.get(u)) {
                if (parent[v] == -1 && v != 0) {
                    parent[v] = u;
                    order[cnt++] = v;
                }
            }
        }

        // Bottom-up over reverse BFS order; s[v][t] accumulates the
        // children's dp column so each node finalizes in O(15). Column
        // 15 stays 0 forever (the absorbed state).
        long[][] s = new long[n][16];
        long[][] dp = new long[n][16];
        for (int i = n - 1; i >= 0; i--) {
            int v = order[i];
            int c = coins[v];
            long[] row = s[v];
            long[] best = dp[v];
            for (int t = 0; t < 15; t++) {
                // First way: take the k hit (it may be negative). Second
                // way: halve, and the children inherit t + 1.
                long way1 = (c >> t) - k + row[t];
                long way2 = (c >> (t + 1)) + row[t + 1];
                best[t] = Math.max(way1, way2);
            }
            int p = parent[v];
            if (p >= 0) {
                long[] sp = s[p];
                for (int t = 0; t < 15; t++) {
                    sp[t] += best[t];
                }
            }
        }
        return dp[0][0];
    }
}
