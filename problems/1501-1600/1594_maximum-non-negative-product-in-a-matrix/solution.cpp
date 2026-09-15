class Solution {
  public:
    int maxProductPath(vector<vector<int>> &grid) {
        const long long MOD = 1'000'000'007LL;
        int m = grid.size();
        int n = grid[0].size();
        vector<long long> maxRow(n), minRow(n);
        maxRow[0] = minRow[0] = grid[0][0];
        for (int j = 1; j < n; j++) {
            long long value = maxRow[j - 1] * grid[0][j];
            maxRow[j] = minRow[j] = value;
        }

        for (int i = 1; i < m; i++) {
            vector<long long> newMax(n), newMin(n);
            long long value = maxRow[0] * grid[i][0];
            newMax[0] = newMin[0] = value;
            for (int j = 1; j < n; j++) {
                long long cur = grid[i][j];
                long long a = maxRow[j] * cur;
                long long b = minRow[j] * cur;
                long long c = newMax[j - 1] * cur;
                long long d = newMin[j - 1] * cur;
                newMax[j] = max({a, b, c, d});
                newMin[j] = min({a, b, c, d});
            }
            maxRow = newMax;
            minRow = newMin;
        }

        long long best = maxRow[n - 1];
        if (best < 0) {
            return -1;
        }
        return static_cast<int>(best % MOD);
    }
};
