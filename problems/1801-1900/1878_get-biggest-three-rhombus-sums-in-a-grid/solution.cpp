class Solution {
  public:
    // Enumerate every (center, k) rhombus by walking its four edges;
    // keep distinct sums and return the three largest.
    vector<long long> getBiggestThree(vector<vector<int>> &grid) {
        int m = grid.size();
        int n = grid[0].size();
        set<long long> sums;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                for (int k = 0;; k++) {
                    if (r - k < 0 || r + k >= m || c - k < 0 || c + k >= n) {
                        break;
                    }
                    long long total = 0;
                    if (k == 0) {
                        total = grid[r][c];
                    } else {
                        for (int i = 0; i < k; i++) {
                            total += grid[r - k + i][c - i];
                            total += grid[r + i][c - k + i];
                            total += grid[r + k - i][c + i];
                            total += grid[r - i][c + k - i];
                        }
                    }
                    sums.insert(total);
                }
            }
        }
        vector<long long> out(sums.rbegin(), sums.rend());
        if (out.size() > 3)
            out.resize(3);
        return out;
    }
};
