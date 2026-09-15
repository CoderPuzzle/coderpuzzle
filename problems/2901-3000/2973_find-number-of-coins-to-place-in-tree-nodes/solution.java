import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public long[] placedCoins(int[][] edges, int[] cost) {
        // Per subtree keep the three largest and the two smallest cost
        // values: the maximum product of three distinct nodes is either the
        // three largest or the two smallest times the largest. Subtrees can
        // be one long chain (n up to 2 * 10^4), so the traversal collects
        // parents by BFS and merges children in reverse BFS order.
        int n = cost.length;
        List<List<Integer>> adj = new ArrayList<>(n);
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        int[] parent = new int[n];
        Arrays.fill(parent, -1);
        int[] order = new int[n];
        int tail = 0;
        order[tail++] = 0;
        for (int head = 0; head < tail; head++) {
            int u = order[head];
            for (int v : adj.get(u)) {
                if (v != parent[u]) {
                    parent[v] = u;
                    order[tail++] = v;
                }
            }
        }

        long[] ans = new long[n];
        int[] size = new int[n];
        Arrays.fill(size, 1);
        int[][] top = new int[n][]; // up to 3 largest, descending
        int[][] bot = new int[n][]; // up to 2 smallest, ascending
        for (int i = 0; i < n; i++) {
            top[i] = new int[] { cost[i] };
            bot[i] = new int[] { cost[i] };
        }
        for (int k = n - 1; k >= 0; k--) {
            int u = order[k];
            if (size[u] < 3) {
                ans[u] = 1;
            } else {
                int[] t = top[u];
                int[] b = bot[u];
                long best = Math.max((long) t[0] * t[1] * t[2], (long) b[0] * b[1] * t[0]);
                ans[u] = best > 0 ? best : 0;
            }
            int p = parent[u];
            if (p >= 0) {
                size[p] += size[u];
                int[] merged = new int[top[p].length + top[u].length];
                System.arraycopy(top[p], 0, merged, 0, top[p].length);
                System.arraycopy(top[u], 0, merged, top[p].length, top[u].length);
                Arrays.sort(merged);
                int m = merged.length;
                if (m >= 3) {
                    top[p] = new int[] { merged[m - 1], merged[m - 2], merged[m - 3] };
                } else {
                    top[p] = Arrays.copyOf(merged, m);
                }
                merged = new int[bot[p].length + bot[u].length];
                System.arraycopy(bot[p], 0, merged, 0, bot[p].length);
                System.arraycopy(bot[u], 0, merged, bot[p].length, bot[u].length);
                Arrays.sort(merged);
                bot[p] = Arrays.copyOf(merged, Math.min(2, merged.length));
            }
        }
        return ans;
    }
}
