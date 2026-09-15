import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] findMedian(int n, int[][] edges, int[][] queries) {
        // Root the tree at 0 with an explicit stack (a 10^5-node chain
        // would blow the default stack), recording parent, depth and
        // weighted root distance. Binary lifting then answers each
        // query in O(log n): lift to the LCA l, take the total path
        // weight tot and the cumulative sum acc from u to l. "Sum >=
        // tot/2" is tested as 2 * sum >= tot so no halves appear; all
        // distances fit in long (n * max_w <= 10^14).
        List<List<int[]>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            adj.get(e[0]).add(new int[] { e[1], e[2] });
            adj.get(e[1]).add(new int[] { e[0], e[2] });
        }
        int[] parent = new int[n];
        int[] depth = new int[n];
        long[] dist = new long[n];
        boolean[] seen = new boolean[n];
        seen[0] = true;
        int[] stack = new int[n];
        int top = 0;
        stack[top++] = 0;
        while (top > 0) {
            int u = stack[--top];
            for (int[] vw : adj.get(u)) {
                int v = vw[0];
                if (!seen[v]) {
                    seen[v] = true;
                    parent[v] = u;
                    depth[v] = depth[u] + 1;
                    dist[v] = dist[u] + vw[1];
                    stack[top++] = v;
                }
            }
        }
        int log = 1;
        while (1 << log < n) {
            log++;
        }
        int[][] up = new int[log][];
        up[0] = parent;
        for (int k = 1; k < log; k++) {
            int[] prev = up[k - 1];
            int[] cur = new int[n];
            for (int v = 0; v < n; v++) {
                cur[v] = prev[prev[v]];
            }
            up[k] = cur;
        }
        int[] answer = new int[queries.length];
        for (int qi = 0; qi < queries.length; qi++) {
            int a = queries[qi][0];
            int b = queries[qi][1];
            if (a == b) {
                // Single-node path: the sum from a to itself (0)
                // already meets half of the zero total, so a is the
                // median.
                answer[qi] = a;
                continue;
            }
            int u = a;
            int v = b;
            if (depth[u] < depth[v]) {
                u = b;
                v = a;
            }
            int diff = depth[u] - depth[v];
            int k = 0;
            while (diff > 0) {
                if ((diff & 1) == 1) {
                    u = up[k][u];
                }
                diff >>= 1;
                k++;
            }
            int l = v;
            if (u != v) {
                for (int kk = log - 1; kk >= 0; kk--) {
                    if (up[kk][u] != up[kk][v]) {
                        u = up[kk][u];
                        v = up[kk][v];
                    }
                }
                l = parent[u];
            }
            long tot = dist[a] + dist[b] - 2 * dist[l];
            long acc = dist[a] - dist[l];
            if (2 * acc >= tot) {
                // Median on the a -> l stretch. Climb from a while the
                // criterion still fails; the parent of the deepest
                // failing node is the first one that satisfies it.
                int x = a;
                for (int kk = log - 1; kk >= 0; kk--) {
                    int t = up[kk][x];
                    if (depth[t] >= depth[l] && 2 * (dist[a] - dist[t]) < tot) {
                        x = t;
                    }
                }
                answer[qi] = parent[x];
            } else {
                // Median on the l -> b stretch. Climb from b while the
                // criterion still holds; the highest such node (never
                // l itself, which failed) is the median.
                int x = b;
                for (int kk = log - 1; kk >= 0; kk--) {
                    int t = up[kk][x];
                    if (depth[t] > depth[l] && 2 * (acc + dist[t] - dist[l]) >= tot) {
                        x = t;
                    }
                }
                answer[qi] = x;
            }
        }
        return answer;
    }
}
