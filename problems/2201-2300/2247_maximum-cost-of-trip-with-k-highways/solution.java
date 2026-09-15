import java.util.ArrayList;
import java.util.List;

class Solution {

    public int maximumCost(int n, int[][] highways, int k) {
        if (k + 1 > n) return -1;
        List<int[]>[] adj = new ArrayList[n];
        for (int v = 0; v < n; v++) adj[v] = new ArrayList<>();
        for (int[] h : highways) {
            int a = h[0],
                b = h[1],
                toll = h[2];
            adj[a].add(new int[] { b, toll });
            adj[b].add(new int[] { a, toll });
        }
        final int NEG = Integer.MIN_VALUE;
        int[][] dp = new int[1 << n][n];
        for (int mask = 0; mask < 1 << n; mask++) {
            for (int v = 0; v < n; v++) dp[mask][v] = NEG;
        }
        for (int v = 0; v < n; v++) dp[1 << v][v] = 0;
        int best = -1;
        for (int mask = 0; mask < 1 << n; mask++) {
            int pc = Integer.bitCount(mask);
            if (pc > k + 1) continue;
            for (int v = 0; v < n; v++) {
                int cur = dp[mask][v];
                if (cur == NEG) continue;
                if (pc == k + 1) {
                    if (cur > best) best = cur;
                    continue;
                }
                for (int[] e : adj[v]) {
                    int u = e[0],
                        toll = e[1];
                    if ((mask & (1 << u)) == 0) {
                        int nxt = cur + toll;
                        int nm = mask | (1 << u);
                        if (nxt > dp[nm][u]) dp[nm][u] = nxt;
                    }
                }
            }
        }
        return best;
    }
}
