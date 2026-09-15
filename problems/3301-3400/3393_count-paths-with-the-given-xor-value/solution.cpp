class Solution {
  public:
    int countPathsWithXorValue(vector<vector<int>> &grid, int k) {
        const long long MOD = 1000000007LL;
        int m = grid.size();
        int n = grid[0].size();
        // dp[i][j][x] = number of paths from (0,0) to (i,j) whose XOR is x
        vector<vector<array<long long, 16>>> dp(m, vector<array<long long, 16>>(n));
        dp[0][0][grid[0][0]] = 1;
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (i == 0 && j == 0)
                    continue;
                int cell = grid[i][j];
                for (int x = 0; x < 16; x++) {
                    long long total = 0;
                    if (i > 0)
                        total += dp[i - 1][j][x ^ cell];
                    if (j > 0)
                        total += dp[i][j - 1][x ^ cell];
                    dp[i][j][x] = total % MOD;
                }
            }
        }
        return (int)dp[m - 1][n - 1][k];
    }
};
