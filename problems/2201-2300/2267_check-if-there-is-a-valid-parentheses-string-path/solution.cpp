class Solution {
  public:
    bool hasValidPath(vector<vector<string>> &grid) {
        // dp[r][c] is the set of balances reachable at that cell, where the
        // balance counts '(' minus ')' along the path. A prefix whose balance
        // ever goes negative can never close into a valid string, so those
        // balances are dropped as each move is extended.
        int m = grid.size(), n = grid[0].size();
        int start = grid[0][0] == "(" ? 1 : -1;
        if (start < 0)
            return false;
        vector<vector<unordered_set<int>>> dp(m, vector<unordered_set<int>>(n));
        dp[0][0].insert(start);
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                for (int balance : dp[r][c]) {
                    if (r + 1 < m) {
                        int nb = balance + (grid[r + 1][c] == "(" ? 1 : -1);
                        if (nb >= 0)
                            dp[r + 1][c].insert(nb);
                    }
                    if (c + 1 < n) {
                        int nb = balance + (grid[r][c + 1] == "(" ? 1 : -1);
                        if (nb >= 0)
                            dp[r][c + 1].insert(nb);
                    }
                }
            }
        }
        return dp[m - 1][n - 1].count(0);
    }
};
