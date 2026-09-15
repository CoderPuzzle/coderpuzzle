class Solution {
  public:
    long long minCost(int m, int n, vector<vector<int>> &waitCost) {
        // Totals reach ~2 * 10^10 on the largest inputs, so dp is long long.
        // Between two consecutive moves a path waits once, on the cell it is
        // leaving — never before the first move or after the last. dp[j] is
        // the cheapest cost of standing on (i, j), entry paid plus every
        // earlier departed cell's wait.
        vector<long long> dp(n), prev(n);
        // First row: reachable only from the left; entry cost is j + 1.
        dp[0] = 1;
        for (int j = 1; j < n; j++) {
            // The start's departure skips its wait; move 1 is immediate.
            long long wait = j == 1 ? 0 : waitCost[0][j - 1];
            dp[j] = dp[j - 1] + wait + (j + 1);
        }
        for (int i = 1; i < m; i++) {
            swap(dp, prev);
            // First column: reachable only from above.
            dp[0] = prev[0] + (i == 1 ? 0 : waitCost[i - 1][0]) + (i + 1);
            for (int j = 1; j < n; j++) {
                dp[j] = min(prev[j] + waitCost[i - 1][j], dp[j - 1] + waitCost[i][j - 1]) +
                        static_cast<long long>(i + 1) * (j + 1);
            }
        }
        return dp[n - 1];
    }
};
