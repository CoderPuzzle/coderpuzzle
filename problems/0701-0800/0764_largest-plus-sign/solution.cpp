class Solution {
  public:
    int orderOfLargestPlusSign(int n, vector<vector<int>> &mines) {
        // dp[i][j] ends as the order of the largest plus centered at (i, j):
        // every cell starts uncapped at n, mines drop to 0, then four
        // directional sweeps cap it by the run of consecutive 1's that way.
        vector<vector<int>> dp(n, vector<int>(n, n));
        for (const vector<int> &mine : mines) {
            dp[mine[0]][mine[1]] = 0;
        }
        for (int i = 0; i < n; ++i) {
            int run = 0;
            for (int j = 0; j < n; ++j) {
                run = dp[i][j] > 0 ? run + 1 : 0;
                dp[i][j] = min(dp[i][j], run);
            }
            run = 0;
            for (int j = n - 1; j >= 0; --j) {
                run = dp[i][j] > 0 ? run + 1 : 0;
                dp[i][j] = min(dp[i][j], run);
            }
        }
        for (int j = 0; j < n; ++j) {
            int run = 0;
            for (int i = 0; i < n; ++i) {
                run = dp[i][j] > 0 ? run + 1 : 0;
                dp[i][j] = min(dp[i][j], run);
            }
            run = 0;
            for (int i = n - 1; i >= 0; --i) {
                run = dp[i][j] > 0 ? run + 1 : 0;
                dp[i][j] = min(dp[i][j], run);
            }
        }
        int best = 0;
        for (const vector<int> &row : dp) {
            for (int value : row) {
                best = max(best, value);
            }
        }
        return best;
    }
};
