class Solution {
  public:
    long long numberOfRightTriangles(vector<vector<int>> &grid) {
        // Every right triangle has a unique corner cell: its horizontal
        // leg endpoint and vertical leg endpoint can be picked
        // independently from the other 1s in that row and column. A
        // collinear triple never qualifies, so the corner count is exact.
        // Accumulate in long long: up to 10^6 * 999 * 999 ~= 9.98e11 >
        // 2^31.
        int rows = grid.size();
        int cols = grid[0].size();
        vector<long long> rowOnes(rows), colOnes(cols);
        for (int r = 0; r < rows; ++r)
            for (int c = 0; c < cols; ++c)
                if (grid[r][c] == 1) {
                    ++rowOnes[r];
                    ++colOnes[c];
                }
        long long total = 0;
        for (int r = 0; r < rows; ++r)
            for (int c = 0; c < cols; ++c)
                if (grid[r][c] == 1)
                    total += (rowOnes[r] - 1) * (colOnes[c] - 1);
        return total;
    }
};
