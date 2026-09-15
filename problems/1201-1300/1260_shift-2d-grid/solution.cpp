class Solution {
  public:
    vector<vector<int>> shiftGrid(vector<vector<int>> &grid, int k) {
        const int m = static_cast<int>(grid.size());
        const int n = static_cast<int>(grid[0].size());
        const long long total = static_cast<long long>(m) * n;
        k = static_cast<int>(k % total);
        // One shift = a cyclic right-rotation of the flattened grid.
        vector<int> shifted(total, 0);
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                shifted[((long long)r * n + c + k) % total] = grid[r][c];
            }
        }
        vector<vector<int>> result(m, vector<int>(n));
        for (int i = 0; i < total; ++i) {
            result[i / n][i % n] = shifted[i];
        }
        return result;
    }
};
