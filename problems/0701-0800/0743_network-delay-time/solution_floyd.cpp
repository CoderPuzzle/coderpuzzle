class Solution {
  public:
    int networkDelayTime(vector<vector<int>> &times, int n, int k) {
        const int INF = 1e8;
        vector<vector<int>> d(n + 1, vector<int>(n + 1, INF));
        for (int i = 1; i <= n; ++i)
            d[i][i] = 0;
        for (const auto &t : times)
            if (t[2] < d[t[0]][t[1]]) // keep the smallest parallel-edge weight
                d[t[0]][t[1]] = t[2];
        // Relax every path through each midpoint m: one shot gives all pairs.
        for (int m = 1; m <= n; ++m)
            for (int i = 1; i <= n; ++i)
                for (int j = 1; j <= n; ++j)
                    // The finite guards keep INF + INF from overflowing.
                    if (d[i][m] < INF && d[m][j] < INF && d[i][m] + d[m][j] < d[i][j])
                        d[i][j] = d[i][m] + d[m][j];
        int best = 0;
        for (int j = 1; j <= n; ++j) {
            // Anything still INF in row k is unreachable from the source.
            if (d[k][j] >= INF)
                return -1;
            best = max(best, d[k][j]);
        }
        return best;
    }
};
