import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int minimumScore(int[] nums, int[][] edges) {
        int n = nums.length;
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        // Iterative DFS from node 0 with an explicit stack: tin/tout record
        // each subtree as the half-open interval [tin[u], tout[u]) of entry
        // stamps, so the ancestor test is a plain range check. Popping the
        // ~u marker is the post-order moment -- fold sub[u] into its parent
        // there, after every descendant has already contributed.
        int[] tin = new int[n];
        int[] tout = new int[n];
        int[] parent = new int[n];
        Arrays.fill(parent, -1);
        int[] sub = nums.clone();
        int timer = 0;
        int[] stack = new int[2 * n];
        int top = 0;
        stack[top++] = 0;
        while (top > 0) {
            int u = stack[--top];
            if (u >= 0) {
                tin[u] = timer++;
                stack[top++] = ~u;
                for (int v : adj.get(u)) {
                    if (v != parent[u]) {
                        parent[v] = u;
                        stack[top++] = v;
                    }
                }
            } else {
                u = ~u;
                tout[u] = timer;
                int p = parent[u];
                if (p >= 0) sub[p] ^= sub[u];
            }
        }

        int total = sub[0];

        // Every edge is its child endpoint, so the pairs below run over all
        // ways to remove two edges. The three cases are exhaustive and
        // mutually exclusive, and in each the third component's XOR is
        // recovered from the other two. Values are at most 10^8 (< 2^27),
        // so every XOR and every score difference fits an int.
        int best = Integer.MAX_VALUE;
        for (int x = 1; x < n; x++) {
            int sx = sub[x],
                tx = tin[x],
                ex = tout[x],
                tpx = total ^ sx;
            for (int y = x + 1; y < n; y++) {
                int sy = sub[y],
                    ty = tin[y];
                int a, b, c;
                if (tx <= ty && ty < ex) {
                    // x is an ancestor of y
                    a = sy;
                    c = tpx;
                    b = sx ^ sy;
                } else if (ty <= tx && tx < tout[y]) {
                    // y is an ancestor of x
                    a = sx;
                    c = total ^ sy;
                    b = sx ^ sy;
                } else {
                    // disjoint subtrees
                    a = sx;
                    b = sy;
                    c = tpx ^ sy;
                }
                int lo = Math.min(a, b),
                    hi = Math.max(a, b);
                if (c < lo) lo = c;
                else if (c > hi) hi = c;
                best = Math.min(best, hi - lo);
            }
        }
        return best;
    }
}
