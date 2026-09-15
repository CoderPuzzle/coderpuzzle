import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int[] assignEdgeWeights(int[][] edges, int[][] queries) {
        // As in part I, a path of d edges has odd cost for exactly 2^(d-1)
        // of its 2^d assignments (d = 0 answers 0), so each query only
        // needs the path length d = depth[u] + depth[v] - 2 * depth[lca].
        // Binary lifting answers every LCA in O(log n); the tree is rooted
        // with an explicit stack because it can be a 10^5-node chain.
        final int mod = 1_000_000_007;
        int n = edges.length + 1;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            adj.add(new ArrayList<>());
        }
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        int[] depth = new int[n + 1];
        int[] parent = new int[n + 1];
        boolean[] seen = new boolean[n + 1];
        seen[1] = true;
        int[] stack = new int[n];
        int top = 0;
        stack[top++] = 1;
        while (top > 0) {
            int u = stack[--top];
            for (int v : adj.get(u)) {
                if (!seen[v]) {
                    seen[v] = true;
                    parent[v] = u;
                    depth[v] = depth[u] + 1;
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
            int[] cur = new int[n + 1];
            for (int v = 0; v <= n; v++) {
                cur[v] = prev[prev[v]];
            }
            up[k] = cur;
        }
        int[] p2 = new int[n];
        p2[0] = 1;
        for (int i = 1; i < n; i++) {
            p2[i] = (int) (((long) p2[i - 1] * 2) % mod);
        }
        int[] answer = new int[queries.length];
        for (int qi = 0; qi < queries.length; qi++) {
            int u = queries[qi][0];
            int v = queries[qi][1];
            if (depth[u] < depth[v]) {
                int t = u;
                u = v;
                v = t;
            }
            int du = depth[u];
            int dv = depth[v];
            int diff = du - dv;
            int k = 0;
            while (diff > 0) {
                if ((diff & 1) == 1) {
                    u = up[k][u];
                }
                diff >>= 1;
                k++;
            }
            if (u != v) {
                for (int kk = log - 1; kk >= 0; kk--) {
                    if (up[kk][u] != up[kk][v]) {
                        u = up[kk][u];
                        v = up[kk][v];
                    }
                }
                v = parent[u];
            }
            int d = du + dv - 2 * depth[v];
            answer[qi] = d == 0 ? 0 : p2[d - 1];
        }
        return answer;
    }
}
