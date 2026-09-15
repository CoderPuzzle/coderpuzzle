class Solution {
  public:
    // Four prefix tables; per-window line sums are O(1).
    int largestMagicSquare(vector<vector<int>> &grid) {
        int m = grid.size(), n = grid[0].size();
        vector<vector<long long>> rs(m + 1, vector<long long>(n + 1, 0));
        auto cs = rs;
        vector<vector<long long>> d1(m + 1, vector<long long>(n + 2, 0));
        auto a2 = d1;
        for (int i = 1; i <= m; i++) {
            for (int j = 1; j <= n; j++) {
                long long v = grid[i - 1][j - 1];
                rs[i][j] = rs[i][j - 1] + v;
                cs[i][j] = cs[i - 1][j] + v;
                d1[i][j] = v + d1[i - 1][j - 1];
            }
        }
        for (int i = 1; i <= m; i++) {
            for (int j = n; j >= 1; j--) {
                a2[i][j] = grid[i - 1][j - 1] + a2[i - 1][j + 1];
            }
        }
        auto rsum = [&](int i, int j, int k) { return rs[i + 1][j + k] - rs[i + 1][j]; };
        auto csum = [&](int i, int j, int k) { return cs[i + k][j + 1] - cs[i][j + 1]; };
        for (int k = min(m, n); k >= 1; k--) {
            for (int i = 0; i + k <= m; i++) {
                for (int j = 0; j + k <= n; j++) {
                    long long s = rsum(i, j, k);
                    bool ok = true;
                    for (int t = 1; t < k && ok; t++)
                        ok = rsum(i + t, j, k) == s;
                    for (int t = 0; t < k && ok; t++)
                        ok = csum(i, j + t, k) == s;
                    if (ok)
                        ok = d1[i + k][j + k] - d1[i][j] == s;
                    if (ok)
                        ok = a2[i + k][j + 1] - a2[i][j + 1 + k] == s;
                    if (ok)
                        return k;
                }
            }
        }
        return 1;
    }
};
