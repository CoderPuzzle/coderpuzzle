class Solution {
  public:
    int cherryPickup(vector<vector<int>> &grid) {
        int n = (int)grid.size();
        // dp[r1][r2]: best cherries with walker 1 at (r1, t-r1) and walker 2 at
        // (r2, t-r2) after t steps; -1 marks unreachable states.
        vector<vector<int>> dp(n, vector<int>(n, -1));
        dp[0][0] = grid[0][0];
        for (int t = 1; t <= 2 * n - 2; t++) {
            vector<vector<int>> ndp(n, vector<int>(n, -1));
            int lo = max(0, t - n + 1), hi = min(n - 1, t);
            for (int r1 = lo; r1 <= hi; r1++) {
                int c1 = t - r1;
                if (grid[r1][c1] == -1)
                    continue;
                for (int r2 = r1; r2 <= hi; r2++) {
                    int c2 = t - r2;
                    if (grid[r2][c2] == -1)
                        continue;
                    int best = -1;
                    for (int pr1 = r1 - 1; pr1 <= r1; pr1++) {
                        for (int pr2 = r2 - 1; pr2 <= r2; pr2++) {
                            if (pr1 >= 0 && pr1 < n && pr2 >= 0 && pr2 < n)
                                best = max(best, dp[pr1][pr2]);
                        }
                    }
                    if (best < 0)
                        continue;
                    int gain = grid[r1][c1] + (r1 != r2 ? grid[r2][c2] : 0);
                    ndp[r1][r2] = best + gain;
                }
            }
            dp = move(ndp);
        }
        return max(dp[n - 1][n - 1], 0);
    }
};
