import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    private int[][] up;
    private int[] depth;
    private int[] parent;
    private int log;

    public int[] closestNode(int n, int[][] edges, int[][] query) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        // Breadth-first walk from the root records parents and depths
        // without recursion, so chain-shaped trees cannot overflow the
        // call stack.
        parent = new int[n];
        Arrays.fill(parent, -1);
        depth = new int[n];
        boolean[] visited = new boolean[n];
        int[] order = new int[n];
        int head = 0,
            tail = 1;
        visited[0] = true;
        while (head < tail) {
            int u = order[head++];
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    parent[v] = u;
                    depth[v] = depth[u] + 1;
                    order[tail++] = v;
                }
            }
        }

        // up[k][v] is the 2^k-th ancestor of v, or -1 once past the root.
        log = 1;
        while (1 << log < n) log++;
        up = new int[log][n];
        for (int[] row : up) Arrays.fill(row, -1);
        up[0] = parent.clone();
        for (int k = 1; k < log; k++) {
            for (int v = 0; v < n; v++) {
                int mid = up[k - 1][v];
                if (mid != -1) up[k][v] = up[k - 1][mid];
            }
        }

        // The deepest of the three pairwise LCAs is where node's route
        // merges onto the start-end path -- always on the path, and the
        // unique minimizer of the distance to it.
        int[] answer = new int[query.length];
        for (int i = 0; i < query.length; i++) {
            int s = query[i][0],
                e = query[i][1],
                x = query[i][2];
            int best = lca(s, e);
            int a = lca(s, x);
            if (depth[a] > depth[best]) best = a;
            int b = lca(e, x);
            if (depth[b] > depth[best]) best = b;
            answer[i] = best;
        }
        return answer;
    }

    private int lca(int u, int v) {
        if (depth[u] < depth[v]) {
            int t = u;
            u = v;
            v = t;
        }
        int diff = depth[u] - depth[v],
            bit = 0;
        while (diff > 0) {
            if ((diff & 1) == 1) u = up[bit][u];
            diff >>= 1;
            bit++;
        }
        if (u == v) return u;
        for (int k = log - 1; k >= 0; k--) {
            if (up[k][u] != up[k][v]) {
                u = up[k][u];
                v = up[k][v];
            }
        }
        return parent[u];
    }
}
