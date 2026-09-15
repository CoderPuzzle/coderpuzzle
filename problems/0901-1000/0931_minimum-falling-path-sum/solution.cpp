class Solution {
  public:
    int minFallingPathSum(vector<vector<int>> &matrix) {
        // Sweep the rows top to bottom carrying one row of answers: dp[j]
        // is the smallest sum of a falling path ending at the current
        // row's column j, built from the three reachable parents above.
        size_t n = matrix[0].size();
        vector<int> dp = matrix[0];
        for (size_t r = 1; r < matrix.size(); ++r) {
            vector<int> next(n);
            for (size_t j = 0; j < n; ++j) {
                int best = dp[j];
                if (j > 0 && dp[j - 1] < best) {
                    best = dp[j - 1];
                }
                if (j + 1 < n && dp[j + 1] < best) {
                    best = dp[j + 1];
                }
                next[j] = matrix[r][j] + best;
            }
            dp = move(next);
        }
        int ans = dp[0];
        for (size_t j = 1; j < n; ++j) {
            if (dp[j] < ans) {
                ans = dp[j];
            }
        }
        return ans;
    }
};
