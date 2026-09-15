import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] minEdgeReversals(int n, int[][] edges) {
        List<int[]>[] graph = new ArrayList[n];
        for (int i = 0; i < n; i++) graph[i] = new ArrayList<>();
        for (int[] e : edges) {
            graph[e[0]].add(new int[] { e[1], 0 }); // traversing u -> v costs 0
            graph[e[1]].add(new int[] { e[0], 1 }); // traversing v -> u costs 1 (reversal)
        }
        int[] parent = new int[n];
        java.util.Arrays.fill(parent, -1);
        int[] order = new int[n];
        int m = 0;
        order[m++] = 0;
        for (int i = 0; i < m; i++) {
            int x = order[i];
            for (int[] t : graph[x]) {
                int y = t[0];
                if (y != parent[x]) {
                    parent[y] = x;
                    order[m++] = y;
                }
            }
        }

        int[] dp = new int[n];
        for (int i = n - 1; i >= 0; i--) {
            int x = order[i];
            for (int[] t : graph[x]) {
                if (parent[t[0]] == x) dp[x] += dp[t[0]] + t[1];
            }
        }

        int[] ans = new int[n];
        ans[0] = dp[0];
        for (int i = 0; i < n; i++) {
            int x = order[i];
            for (int[] t : graph[x]) {
                if (parent[t[0]] == x) ans[t[0]] = ans[x] + (t[1] == 0 ? 1 : -1);
            }
        }
        return ans;
    }
}
