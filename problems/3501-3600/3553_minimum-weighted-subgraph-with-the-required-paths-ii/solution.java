import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public long[] minimumWeight(int[][] edges, int[][] queries) {
        int n = edges.length + 1;
        List<int[]>[] adj = new ArrayList[n];
        for (int i = 0; i < n; i++) {
            adj[i] = new ArrayList<>();
        }
        for (int[] e : edges) {
            adj[e[0]].add(new int[] { e[1], e[2] });
            adj[e[1]].add(new int[] { e[0], e[2] });
        }

        // Root at 0; iterative traversal so deep chains cannot overflow the stack.
        int[] depth = new int[n];
        long[] dist = new long[n];
        int[] parent = new int[n];
        boolean[] seen = new boolean[n];
        seen[0] = true;
        Deque<Integer> stack = new ArrayDeque<>();
        stack.push(0);
        while (!stack.isEmpty()) {
            int u = stack.pop();
            for (int[] e : adj[u]) {
                int v = e[0];
                if (!seen[v]) {
                    seen[v] = true;
                    parent[v] = u;
                    depth[v] = depth[u] + 1;
                    dist[v] = dist[u] + e[1];
                    stack.push(v);
                }
            }
        }

        // Binary lifting: up[k][v] is the 2^k-th ancestor of v (root's is root).
        int log = Math.max(1, 32 - Integer.numberOfLeadingZeros(n - 1));
        int[][] up = new int[log][n];
        up[0] = parent;
        for (int k = 1; k < log; k++) {
            int[] prev = up[k - 1];
            for (int v = 0; v < n; v++) {
                up[k][v] = prev[prev[v]];
            }
        }

        long[] answer = new long[queries.length];
        for (int q = 0; q < queries.length; q++) {
            int a = queries[q][0];
            int b = queries[q][1];
            int c = queries[q][2];
            answer[q] =
                (distance(a, b, dist, up, depth, log) +
                    distance(b, c, dist, up, depth, log) +
                    distance(c, a, dist, up, depth, log)) /
                2;
        }
        return answer;
    }

    private static int lca(int x, int y, int[] depth, int[][] up, int log) {
        if (depth[x] < depth[y]) {
            int t = x;
            x = y;
            y = t;
        }
        int diff = depth[x] - depth[y];
        int k = 0;
        while (diff > 0) {
            if ((diff & 1) == 1) {
                x = up[k][x];
            }
            diff >>= 1;
            k++;
        }
        if (x == y) {
            return x;
        }
        for (k = log - 1; k >= 0; k--) {
            if (up[k][x] != up[k][y]) {
                x = up[k][x];
                y = up[k][y];
            }
        }
        return up[0][x];
    }

    private static long distance(int x, int y, long[] dist, int[][] up, int[] depth, int log) {
        return dist[x] + dist[y] - 2 * dist[lca(x, y, depth, up, log)];
    }
}
