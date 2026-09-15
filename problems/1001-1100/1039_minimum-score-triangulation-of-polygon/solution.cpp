class Solution {
  public:
    int minScoreTriangulation(vector<int> &values) {
        int n = values.size();
        vector<vector<int>> dp(n, vector<int>(n, 0));
        for (int gap = 2; gap < n; gap++) {
            for (int i = 0; i + gap < n; i++) {
                int j = i + gap;
                int best = INT_MAX;
                for (int k = i + 1; k < j; k++) {
                    int candidate = dp[i][k] + dp[k][j] + values[i] * values[k] * values[j];
                    if (candidate < best) {
                        best = candidate;
                    }
                }
                dp[i][j] = best;
            }
        }
        return dp[0][n - 1];
    }
};
