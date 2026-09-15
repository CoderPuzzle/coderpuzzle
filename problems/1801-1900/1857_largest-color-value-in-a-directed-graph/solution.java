import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.List;

class Solution {

    public int largestPathValue(String colors, int[][] edges) {
        int n = colors.length();
        List<List<Integer>> graph = new ArrayList<>();
        for (int i = 0; i < n; i++) graph.add(new ArrayList<>());
        int[] indeg = new int[n];
        for (int[] e : edges) {
            graph.get(e[0]).add(e[1]);
            indeg[e[1]]++;
        }

        // dp[u][c] = max number of color-c nodes on any path ending at u.
        // Kahn's order guarantees every predecessor of u is finalized before
        // u is processed, so the row pushed out of u is final.
        int[][] dp = new int[n][26];
        Deque<Integer> queue = new ArrayDeque<>();
        for (int i = 0; i < n; i++) if (indeg[i] == 0) queue.add(i);
        int visited = 0,
            ans = 0;
        while (!queue.isEmpty()) {
            int u = queue.poll();
            visited++;
            // u extends every incoming path, so count its own color.
            dp[u][colors.charAt(u) - 'a']++;
            int[] du = dp[u];
            // A valid path may end at any node — the row's best entry is a
            // candidate (this is what lets single-node paths count).
            for (int c = 0; c < 26; c++) if (du[c] > ans) ans = du[c];
            for (int v : graph.get(u)) {
                // Element-wise max-merge into the neighbor's row.
                int[] dv = dp[v];
                for (int c = 0; c < 26; c++) if (du[c] > dv[c]) dv[c] = du[c];
                if (--indeg[v] == 0) queue.add(v);
            }
        }
        // Nodes on or downstream of a cycle never reach indegree zero.
        if (visited != n) return -1;
        return ans;
    }
}
