import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public long maxOutput(int n, int[][] edges, int[] price) {
        if (n == 1) {
            return 0L;
        }
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

        // d[v]: best price sum of an "arm", a vertical path starting at
        // v and descending into v's subtree. t1/t2/t1src remember the
        // best two child arms per node so the downward pass can hand each
        // child its "best arm excluding your own branch" value. Path sums
        // reach n * max(price) = 10^10, beyond int range, hence long.
        long[] d = new long[n];
        long[] t1 = new long[n];
        long[] t2 = new long[n];
        long[] up = new long[n];
        int[] t1src = new int[n];
        Arrays.fill(t1src, -1);
        for (int i = n - 1; i >= 0; i--) {
            int v = order[i];
            d[v] = price[v] + t1[v];
            int p = parent[v];
            if (p >= 0) {
                if (d[v] > t1[p]) {
                    t2[p] = t1[p];
                    t1[p] = d[v];
                    t1src[p] = v;
                } else if (d[v] > t2[p]) {
                    t2[p] = d[v];
                }
            }
        }

        // Rerooting. The minimum path at any root is always the lone root,
        // which cancels against its own price inside every arm sum, so the
        // asked difference is exactly the largest arm leaving each node:
        // either straight down into a child subtree (t1) or climbing out
        // through the parent (up).
        long ans = t1[0];
        for (int i = 1; i < n; i++) {
            int v = order[i];
            int p = parent[v];
            long others = t1src[p] == v ? t2[p] : t1[p];
            up[v] = price[p] + Math.max(others, up[p]);
            ans = Math.max(ans, Math.max(t1[v], up[v]));
        }
        return ans;
    }
}
