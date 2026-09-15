class Solution {
  public:
    vector<vector<int>> onesMinusZeros(vector<vector<int>> &grid) {
        // Precompute each row's and column's one-count once; the zero
        // counts follow as n - onesRow and m - onesCol, collapsing the
        // cell formula to 2*onesRow + 2*onesCol - m - n.
        int m = static_cast<int>(grid.size());
        int n = static_cast<int>(grid[0].size());
        vector<int> row_ones(m, 0), col_ones(n, 0);
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                row_ones[i] += grid[i][j];
                col_ones[j] += grid[i][j];
            }
        }
        vector<vector<int>> diff(m, vector<int>(n));
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                diff[i][j] = 2 * row_ones[i] + 2 * col_ones[j] - m - n;
            }
        }
        return diff;
    }
};
