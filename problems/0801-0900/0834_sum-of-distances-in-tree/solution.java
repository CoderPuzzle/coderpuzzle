import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] sumOfDistancesInTree(int n, int[][] edges) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        // Iterative DFS from node 0: parents and a top-down visit order.
        int[] parent = new int[n];
        java.util.Arrays.fill(parent, -1);
        int[] order = new int[n];
        boolean[] seen = new boolean[n];
        seen[0] = true;
        order[0] = 0;
        int count = 1;
        for (int head = 0; head < count; head++) {
            int u = order[head];
            for (int v : adj.get(u)) {
                if (!seen[v]) {
                    seen[v] = true;
                    parent[v] = u;
                    order[count++] = v;
                }
            }
        }

        long[] sub = new long[n];
        long[] dist = new long[n];
        java.util.Arrays.fill(sub, 1L);
        // Bottom-up pass: dist[u] = sum over children of (dist[v] + sub[v]).
        for (int i = count - 1; i >= 0; i--) {
            int u = order[i];
            for (int v : adj.get(u)) {
                if (v == parent[u]) continue;
                sub[u] += sub[v];
                dist[u] += dist[v] + sub[v];
            }
        }

        int[] ans = new int[n];
        ans[0] = (int) dist[0];
        // Top-down re-rooting pass.
        for (int i = 0; i < count; i++) {
            int u = order[i];
            for (int v : adj.get(u)) {
                if (v == parent[u]) continue;
                ans[v] = (int) (ans[u] - sub[v] + (n - sub[v]));
            }
        }
        return ans;
    }
}
