class Solution {
  public:
    int maximumCost(int n, vector<vector<int>> &highways, int k) {
        if (k + 1 > n)
            return -1;
        vector<vector<pair<int, int>>> adj(n);
        for (auto &h : highways) {
            int a = h[0], b = h[1], toll = h[2];
            adj[a].push_back({b, toll});
            adj[b].push_back({a, toll});
        }
        const int NEG = INT_MIN;
        vector<vector<int>> dp(1 << n, vector<int>(n, NEG));
        for (int v = 0; v < n; v++)
            dp[1 << v][v] = 0;
        int best = -1;
        for (int mask = 0; mask < (1 << n); mask++) {
            int pc = __builtin_popcount(mask);
            if (pc > k + 1)
                continue;
            for (int v = 0; v < n; v++) {
                int cur = dp[mask][v];
                if (cur == NEG)
                    continue;
                if (pc == k + 1) {
                    if (cur > best)
                        best = cur;
                    continue;
                }
                for (auto &[u, toll] : adj[v]) {
                    if (!(mask & (1 << u))) {
                        int nxt = cur + toll;
                        int nm = mask | (1 << u);
                        if (nxt > dp[nm][u])
                            dp[nm][u] = nxt;
                    }
                }
            }
        }
        return best;
    }
};
