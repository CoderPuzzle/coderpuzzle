class Solution {
  public:
    int maximumRows(vector<vector<int>> &matrix, int numSelect) {
        // Encode rows as bitmasks; a set of selected columns covers a
        // row exactly when the row's mask is a subset of it. Enumerate
        // every mask with popcount == numSelect and keep the best.
        int m = matrix.size(), n = matrix[0].size();
        vector<int> masks(m, 0);
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (matrix[i][j]) {
                    masks[i] |= 1 << j;
                }
            }
        }
        int best = 0;
        for (int sel = 0; sel < (1 << n); ++sel) {
            if (__builtin_popcount((unsigned)sel) != numSelect) {
                continue;
            }
            int covered = 0;
            for (int row : masks) {
                if ((row & ~sel) == 0) {
                    ++covered;
                }
            }
            best = max(best, covered);
        }
        return best;
    }
};
