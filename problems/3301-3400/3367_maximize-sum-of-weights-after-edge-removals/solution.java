import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public long maximizeSumOfWeights(int[][] edges, int k) {
        int n = 0;
        for (int[] e : edges) {
            n = Math.max(n, Math.max(e[0], e[1]));
        }
        n++;
        List<int[]>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) adj[i] = new ArrayList<>();
        for (int[] e : edges) {
            adj[e[0]].add(new int[] { e[1], e[2] });
            adj[e[1]].add(new int[] { e[0], e[2] });
        }

        int[] parent = new int[n];
        Arrays.fill(parent, -1);
        int[] order = new int[n];
        int orderLen = 0;
        parent[0] = 0;
        int[] stack = new int[n];
        int sp = 0;
        stack[sp++] = 0;
        while (sp > 0) {
            int u = stack[--sp];
            order[orderLen++] = u;
            for (int[] vw : adj[u]) {
                int v = vw[0];
                if (v == parent[u]) continue;
                parent[v] = u;
                stack[sp++] = v;
            }
        }

        // g[u]: best subtree sum when the edge to u's parent is NOT kept.
        // f[u]: best subtree sum when the edge to u's parent IS kept.
        long[] g = new long[n];
        long[] f = new long[n];
        long[] gains = new long[n];
        for (int oi = orderLen - 1; oi >= 0; oi--) {
            int u = order[oi];
            long total = 0;
            int gn = 0;
            for (int[] vw : adj[u]) {
                int v = vw[0];
                if (parent[v] == u) {
                    total += g[v];
                    gains[gn++] = vw[1] + f[v] - g[v];
                }
            }
            // sort gains descending
            long[] gs = Arrays.copyOf(gains, gn);
            Arrays.sort(gs);
            int take = Math.min(k, gn);
            int take1 = Math.min(k - 1, gn);
            long s0 = total;
            long s1 = total;
            for (int i = 0; i < take; i++) {
                long gain = gs[gn - 1 - i];
                if (gain > 0) s0 += gain;
            }
            for (int i = 0; i < take1; i++) {
                long gain = gs[gn - 1 - i];
                if (gain > 0) s1 += gain;
            }
            g[u] = s0;
            f[u] = s1;
        }
        return g[0];
    }
}
