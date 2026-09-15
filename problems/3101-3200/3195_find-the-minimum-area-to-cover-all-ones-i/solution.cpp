class Solution {
  public:
    int minimumArea(vector<vector<int>> &grid) {
        // Every 1 must lie inside the answer, so the rectangle is pinned to
        // the topmost, bottommost, leftmost and rightmost 1; any smaller box
        // would exclude one of those extreme cells. One sweep tracking the
        // four extremes settles it.
        size_t minRow = grid.size();
        size_t maxRow = 0;
        size_t minCol = grid[0].size();
        size_t maxCol = 0;
        for (size_t i = 0; i < grid.size(); ++i) {
            bool hasOne = false;
            size_t first = 0;
            size_t last = 0;
            for (size_t j = 0; j < grid[i].size(); ++j) {
                if (grid[i][j] == 1) {
                    if (!hasOne) {
                        first = j;
                        hasOne = true;
                    }
                    last = j;
                }
            }
            if (!hasOne) {
                continue;
            }
            minRow = min(minRow, i);
            maxRow = i;
            minCol = min(minCol, first);
            maxCol = max(maxCol, last);
        }
        return static_cast<int>((maxRow - minRow + 1) * (maxCol - minCol + 1));
    }
};
