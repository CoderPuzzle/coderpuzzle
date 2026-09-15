class Solution {
  public:
    int getMaximumGold(vector<vector<int>> &grid) {
        rows = grid.size();
        cols = grid[0].size();
        int best = 0;
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                if (grid[r][c] > 0)
                    best = max(best, walk(grid, r, c));
            }
        }
        return best;
    }

  private:
    int rows, cols;

    int walk(vector<vector<int>> &grid, int r, int c) {
        // Zeroing on entry doubles as the visited mark; restore on exit.
        int gold = grid[r][c];
        grid[r][c] = 0;
        int deepest = 0;
        const int dr[4] = {-1, 1, 0, 0};
        const int dc[4] = {0, 0, -1, 1};
        for (int k = 0; k < 4; ++k) {
            int nr = r + dr[k], nc = c + dc[k];
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] > 0) {
                deepest = max(deepest, walk(grid, nr, nc));
            }
        }
        grid[r][c] = gold;
        return gold + deepest;
    }
};
