class Solution {
  public:
    int minDays(vector<vector<int>> &grid) {
        rows = grid.size();
        cols = grid[0].size();

        if (islandCount(grid) != 1) {
            return 0;
        }

        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1) {
                    grid[r][c] = 0;
                    bool disconnected = islandCount(grid) != 1;
                    grid[r][c] = 1;
                    if (disconnected) {
                        return 1;
                    }
                }
            }
        }

        return 2;
    }

  private:
    int rows;
    int cols;

    int islandCount(const vector<vector<int>> &grid) {
        vector<vector<bool>> seen(rows, vector<bool>(cols, false));
        int count = 0;
        static const int dr[4] = {1, -1, 0, 0};
        static const int dc[4] = {0, 0, 1, -1};
        vector<pair<int, int>> stack;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 1 && !seen[r][c]) {
                    count++;
                    stack.clear();
                    stack.push_back({r, c});
                    seen[r][c] = true;
                    while (!stack.empty()) {
                        auto [cr, cc] = stack.back();
                        stack.pop_back();
                        for (int d = 0; d < 4; d++) {
                            int nr = cr + dr[d];
                            int nc = cc + dc[d];
                            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1 && !seen[nr][nc]) {
                                seen[nr][nc] = true;
                                stack.push_back({nr, nc});
                            }
                        }
                    }
                }
            }
        }
        return count;
    }
};
