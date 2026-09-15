import java.util.ArrayList;
import java.util.List;

class Solution {

    public int maxKDivisibleComponents(int n, int[][] edges, int[] values, int k) {
        List<List<Integer>> adj = new ArrayList<>(n);
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] edge : edges) {
            adj.get(edge[0]).add(edge[1]);
            adj.get(edge[1]).add(edge[0]);
        }

        // Iterative DFS from root 0 to get a processing order (parents first).
        int[] parent = new int[n];
        int[] order = new int[n];
        int[] stack = new int[n];
        boolean[] visited = new boolean[n];
        visited[0] = true;
        stack[0] = 0;
        int top = 1,
            count = 0;
        while (top > 0) {
            int u = stack[--top];
            order[count++] = u;
            for (int v : adj.get(u)) {
                if (!visited[v]) {
                    visited[v] = true;
                    parent[v] = u;
                    stack[top++] = v;
                }
            }
        }

        // Process children before parents; cut an edge whenever the finished
        // subtree sum is divisible by k.
        long[] subtree = new long[n];
        for (int i = 0; i < n; i++) subtree[i] = values[i];
        int components = 0;
        for (int i = n - 1; i >= 0; i--) {
            int u = order[i];
            if (u != 0) {
                if (subtree[u] % k == 0) {
                    components++;
                } else {
                    subtree[parent[u]] += subtree[u];
                }
            }
        }
        return components + 1;
    }
}
