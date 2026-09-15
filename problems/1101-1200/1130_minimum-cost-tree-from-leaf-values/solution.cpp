class Solution {
  public:
    int mctFromLeafValues(vector<int> &arr) {
        int n = arr.size();
        // dp[i][j] = min sum of non-leaf nodes for subarray arr[i..j]
        vector<vector<int>> dp(n, vector<int>(n, 0));
        // maxi[i][j] = max leaf value in arr[i..j]
        vector<vector<int>> maxi(n, vector<int>(n, 0));
        for (int i = 0; i < n; i++) {
            maxi[i][i] = arr[i];
        }
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                maxi[i][j] = max(maxi[i][j - 1], arr[j]);
            }
        }
        for (int length = 2; length <= n; length++) {
            for (int i = 0; i + length - 1 < n; i++) {
                int j = i + length - 1;
                int best = INT_MAX;
                for (int k = i; k < j; k++) {
                    int cost = maxi[i][k] * maxi[k + 1][j] + dp[i][k] + dp[k + 1][j];
                    if (cost < best) {
                        best = cost;
                    }
                }
                dp[i][j] = best;
            }
        }
        return dp[0][n - 1];
    }
};
