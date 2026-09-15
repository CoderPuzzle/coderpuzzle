import java.util.ArrayList;
import java.util.List;

class Solution {

    public int minIncrease(int n, int[][] edges, int[] cost) {
        // Scores can only be raised, so every root-to-leaf path must reach
        // M = largest raw path sum. Let f[v] be the largest raw path sum
        // through v; the total raise owed inside v's subtree is g[v] = M -
        // f[v]. g never decreases downward, so an increase is unavoidable
        // exactly when g[v] > g[parent]: that jump cannot be charged any
        // higher. Sums reach 1e5 * 1e9 = 1e14, so use long throughout.
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }
        // Iterative rooted ordering (trees here can be a single long path).
        int[] parent = new int[n];
        int[] order = new int[n];
        boolean[] seen = new boolean[n];
        seen[0] = true;
        order[0] = 0;
        int count = 1;
        for (int i = 0; i < count; ++i) {
            int v = order[i];
            for (int w : adj.get(v)) {
                if (!seen[w]) {
                    seen[w] = true;
                    parent[w] = v;
                    order[count++] = w;
                }
            }
        }
        // Pass 1 (bottom-up): down[v] = largest raw suffix sum v..leaf.
        long[] down = new long[n];
        for (int i = n - 1; i >= 0; --i) {
            int v = order[i];
            long best = 0;
            for (int w : adj.get(v)) {
                if (parent[w] == v && down[w] > best) best = down[w];
            }
            down[v] = cost[v] + best;
        }
        // Pass 2 (top-down): f[v] = raw prefix above v + down[v]; propagate
        // the running minimum of f, and count the strict drops of f, which
        // are exactly the jumps of g.
        long[] prefix = new long[n];
        long[] f = new long[n];
        prefix[0] = cost[0];
        f[0] = down[0];
        int ans = 0;
        for (int i = 1; i < n; ++i) {
            int v = order[i],
                p = parent[v];
            prefix[v] = prefix[p] + cost[v];
            long fv = prefix[p] + down[v];
            if (fv < f[p]) {
                ans++;
                f[v] = fv;
            } else {
                f[v] = f[p];
            }
        }
        return ans;
    }
}
