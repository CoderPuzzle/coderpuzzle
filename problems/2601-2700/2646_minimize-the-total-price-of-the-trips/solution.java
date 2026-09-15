import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int minimumTotalPrice(int n, int[][] edges, int[] price, int[][] trips) {
        List<List<Integer>> adj = new ArrayList<>();
        for (int i = 0; i < n; i++) adj.add(new ArrayList<>());
        for (int[] e : edges) {
            adj.get(e[0]).add(e[1]);
            adj.get(e[1]).add(e[0]);
        }

        // Undiscounted cost is sum(price[i] * freq[i]), so counting how
        // many trip paths pass through each node decouples routing from
        // the discount choice.
        int[] freq = new int[n];
        for (int[] trip : trips) {
            int start = trip[0],
                end = trip[1];
            int[] parent = new int[n];
            java.util.Arrays.fill(parent, -1);
            boolean[] visited = new boolean[n];
            Deque<Integer> stack = new ArrayDeque<>();
            stack.push(start);
            visited[start] = true;
            while (!stack.isEmpty()) {
                int v = stack.pop();
                if (v == end) break;
                for (int u : adj.get(v)) {
                    if (!visited[u]) {
                        visited[u] = true;
                        parent[u] = v;
                        stack.push(u);
                    }
                }
            }
            // Walking back from end through parent pointers touches
            // exactly the unique trip path; halting after start also
            // covers the trivial start == end trip.
            int cur = end;
            while (cur != -1) {
                freq[cur]++;
                if (cur == start) break;
                cur = parent[cur];
            }
        }

        // The answer is the better of the two root states.
        long[] res = dfs(0, -1, adj, price, freq);
        return (int) Math.min(res[0], res[1]);
    }

    private long[] dfs(int v, int p, List<List<Integer>> adj, int[] price, int[] freq) {
        // Classic independent-set tree DP: dfs returns the min subtree
        // cost with v's price kept full (dp0) versus halved (dp1).
        long dp0 = (long) price[v] * freq[v];
        long dp1 = ((long) price[v] / 2) * freq[v];
        for (int u : adj.get(v)) {
            if (u == p) continue;
            long[] c = dfs(u, v, adj, price, freq);
            // A full node accepts children of either state; a halved
            // node forces its children full since discounts apply only
            // to non-adjacent nodes.
            dp0 += Math.min(c[0], c[1]);
            dp1 += c[0];
        }
        return new long[] { dp0, dp1 };
    }
}
