import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

class Solution {

    public int assignEdgeWeights(int[][] edges) {
        // A weight of 2 never changes parity, so only the number of 1s on
        // the path to a deepest node matters: any odd-size subset of the
        // d = max depth edges gives an odd cost, and there are 2^(d-1) of
        // those. An iterative DFS finds d (the tree can be a long chain).
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
        Arrays.fill(depth, -1);
        depth[1] = 0;
        int[] stack = new int[n];
        int top = 0;
        stack[top++] = 1;
        int maxDepth = 0;
        while (top > 0) {
            int u = stack[--top];
            for (int v : adj.get(u)) {
                if (depth[v] < 0) {
                    depth[v] = depth[u] + 1;
                    maxDepth = Math.max(maxDepth, depth[v]);
                    stack[top++] = v;
                }
            }
        }
        long ways = 1;
        for (int i = 0; i < maxDepth - 1; i++) {
            ways = (ways * 2) % mod;
        }
        return (int) ways;
    }
}
