class Solution {
  public:
    vector<vector<int>> specialGrid(int n) {
        // Bottom-up quadrant doubling. A special grid of level k is, in
        // reading order of the conditions, TL = 3·4^(k-1) + G(k-1) on the
        // left of the top half, TR = G(k-1) on the right, BL and BR follow
        // in the bottom half — so each step rebuilds every row of G(k-1)
        // into one top-half row and one bottom-half row, the top halves
        // grouped before the bottom halves.
        vector<vector<int>> grid{{0}};
        int step = 1;
        for (int level = 0; level < n; ++level) {
            int rows = static_cast<int>(grid.size());
            int half = static_cast<int>(grid[0].size());
            vector<vector<int>> next(2 * rows, vector<int>(2 * half));
            for (int index = 0; index < rows; ++index) {
                for (int c = 0; c < half; ++c) {
                    next[index][c] = grid[index][c] + 3 * step;
                    next[index][c + half] = grid[index][c];
                    next[rows + index][c] = grid[index][c] + 2 * step;
                    next[rows + index][c + half] = grid[index][c] + step;
                }
            }
            grid = std::move(next);
            step *= 4;
        }
        return grid;
    }
};
