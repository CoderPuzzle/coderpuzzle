class Solution {
  public:
    int largest1BorderedSquare(vector<vector<int>> &grid) {
        int rows = grid.size(), cols = grid[0].size();
        // prefix[i][j] = sum of the grid rectangle [0..i) x [0..j)
        vector<vector<int>> prefix(rows + 1, vector<int>(cols + 1, 0));
        for (int i = 0; i < rows; ++i)
            for (int j = 0; j < cols; ++j)
                prefix[i + 1][j + 1] = grid[i][j] + prefix[i][j + 1] + prefix[i + 1][j] - prefix[i][j];
        auto rect = [&](int r1, int c1, int r2, int c2) {
            return prefix[r2 + 1][c2 + 1] - prefix[r1][c2 + 1] - prefix[r2 + 1][c1] + prefix[r1][c1];
        };
        int best = 0;
        for (int r1 = 0; r1 < rows; ++r1) {
            for (int c1 = 0; c1 < cols; ++c1) {
                int limit = min(rows - r1, cols - c1);
                for (int side = 1; side <= limit; ++side) {
                    int r2 = r1 + side - 1, c2 = c1 + side - 1;
                    // Each edge is solid iff its cell sum equals its length.
                    if (rect(r1, c1, r1, c2) == side && rect(r2, c1, r2, c2) == side && rect(r1, c1, r2, c1) == side &&
                        rect(r1, c2, r2, c2) == side) {
                        best = max(best, side * side);
                    }
                }
            }
        }
        return best;
    }
};
