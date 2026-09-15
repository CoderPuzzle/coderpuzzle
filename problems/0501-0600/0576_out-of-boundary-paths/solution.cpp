class Solution {
  public:
    int findPaths(int m, int n, int maxMove, int startRow, int startColumn) {
        const long long MOD = 1000000007LL;
        // Zero moves can never leave the grid.
        if (maxMove == 0) {
            return 0;
        }
        // After t passes, prev[i][j] = paths from (i, j) that exit within t moves.
        vector<vector<long long>> prev(m, vector<long long>(n, 0));
        for (int step = 0; step < maxMove; step++) {
            vector<vector<long long>> cur(m, vector<long long>(n, 0));
            for (int i = 0; i < m; i++) {
                for (int j = 0; j < n; j++) {
                    long long total = 0;
                    // An out-of-grid step counts 1 (itself an exit); an in-grid
                    // neighbor contributes its full prev count (exit later from there).
                    if (i + 1 >= m)
                        total++;
                    else
                        total += prev[i + 1][j];
                    if (i - 1 < 0)
                        total++;
                    else
                        total += prev[i - 1][j];
                    if (j + 1 >= n)
                        total++;
                    else
                        total += prev[i][j + 1];
                    if (j - 1 < 0)
                        total++;
                    else
                        total += prev[i][j - 1];
                    cur[i][j] = total % MOD;
                }
            }
            // Each pass only needs the previous layer.
            prev = move(cur);
        }
        return (int)prev[startRow][startColumn];
    }
};
