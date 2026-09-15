class Solution {
  public:
    int uniquePaths(vector<vector<int>> &grid) {
        int m = grid.size(), n = grid[0].size();
        const int MOD = 1e9 + 7;
        // Landing tables for mirror cells: entering a mirror while moving
        // right (br) turns the move down, while moving down (bd) turns it
        // right; -1 marks a chain that leaves the grid. Each deflection
        // lands one row below or one column right of the mirror hit, so a
        // reverse row-major sweep resolves every chain against entries
        // that are already final.
        vector<int> br(m * n, -1), bd(m * n, -1);
        for (int i = m - 1; i >= 0; --i) {
            for (int j = n - 1; j >= 0; --j) {
                if (grid[i][j] == 0)
                    continue;
                int t = i * n + j;
                if (i + 1 < m)
                    br[t] = grid[i + 1][j] == 0 ? t + n : bd[t + n];
                if (j + 1 < n)
                    bd[t] = grid[i][j + 1] == 0 ? t + 1 : br[t + 1];
            }
        }
        // dp[k] counts the ways to stand on cell k. Every jump lands in a
        // strictly later row than the cell it leaves, so one row-major sweep
        // settles each cell before any descendant reads it.
        vector<long long> dp(m * n, 0);
        dp[0] = 1;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                long long v = dp[i * n + j];
                if (v == 0)
                    continue;
                if (j + 1 < n) {
                    int t = i * n + j + 1;
                    int tgt = grid[i][j + 1] == 0 ? t : br[t];
                    if (tgt >= 0)
                        dp[tgt] = (dp[tgt] + v) % MOD;
                }
                if (i + 1 < m) {
                    int t = (i + 1) * n + j;
                    int tgt = grid[i + 1][j] == 0 ? t : bd[t];
                    if (tgt >= 0)
                        dp[tgt] = (dp[tgt] + v) % MOD;
                }
            }
        }
        return static_cast<int>(dp[m * n - 1]);
    }
};
