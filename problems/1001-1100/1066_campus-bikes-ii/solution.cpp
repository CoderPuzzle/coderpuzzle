class Solution {
  public:
    int assignBikes(vector<vector<int>> &workers, vector<vector<int>> &bikes) {
        int n = workers.size();
        int m = bikes.size();
        vector<vector<int>> dist(n, vector<int>(m));
        for (int i = 0; i < n; i++) {
            for (int b = 0; b < m; b++) {
                dist[i][b] = abs(workers[i][0] - bikes[b][0]) + abs(workers[i][1] - bikes[b][1]);
            }
        }
        int size = 1 << m;
        const int INF = INT_MAX;
        vector<int> dp(size, INF);
        dp[0] = 0;
        int best = INF;
        for (int mask = 0; mask < size; mask++) {
            if (dp[mask] == INF) {
                continue;
            }
            int assigned = __builtin_popcount(mask);
            if (assigned == n) {
                if (dp[mask] < best) {
                    best = dp[mask];
                }
                continue;
            }
            for (int b = 0; b < m; b++) {
                if (!(mask >> b & 1)) {
                    int candidate = dp[mask] + dist[assigned][b];
                    int next = mask | (1 << b);
                    if (candidate < dp[next]) {
                        dp[next] = candidate;
                    }
                }
            }
        }
        return best;
    }
};
