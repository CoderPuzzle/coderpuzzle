class Solution {
  public:
    int minimumTotal(vector<vector<int>> &triangle) {
        int n = static_cast<int>(triangle.size());
        // dp[i] = minimum path sum from column i of the current row to the
        // bottom. The last row seeds it directly: a path starting there is
        // just that cell. Sums accumulate in long longs for headroom.
        vector<long long> dp(triangle[n - 1].begin(), triangle[n - 1].end());
        // Work bottom-up: every cell has exactly the two children i and i+1
        // below, so no ragged-edge special cases like a top-down sweep.
        for (int row = n - 2; row >= 0; row--) {
            for (int i = 0; i < static_cast<int>(triangle[row].size()); i++) {
                // Ascending i is safe in place: dp[i+1] still holds the row
                // below's value when read. dp shrinks to dp[0] at the apex.
                dp[i] = static_cast<long long>(triangle[row][i]) + min(dp[i], dp[i + 1]);
            }
        }
        return static_cast<int>(dp[0]);
    }
};
