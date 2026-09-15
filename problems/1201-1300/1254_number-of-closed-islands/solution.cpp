class Solution {
  public:
    int closedIsland(vector<vector<int>> &grid) {
        int rows = grid.size(), cols = grid[0].size();
        int dr[] = {1, -1, 0, 0};
        int dc[] = {0, 0, 1, -1};
        // Each surviving land cell seeds exactly one fill; a fill that never
        // stepped off-grid means the island was surrounded entirely by water.
        int count = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (grid[r][c] == 0) {
                    if (flood(grid, r, c, rows, cols, dr, dc))
                        count++;
                }
            }
        }
        return count;
    }

  private:
    bool flood(vector<vector<int>> &grid, int r, int c, int rows, int cols, int dr[], int dc[]) {
        // Erase land to water as we walk: the fill doubles as the visited
        // marker, and an explicit stack keeps snake-shaped islands from
        // overflowing the recursion stack.
        vector<pair<int, int>> stack;
        grid[r][c] = 1;
        stack.push_back({r, c});
        bool closed = true;
        while (!stack.empty()) {
            auto [x, y] = stack.back();
            stack.pop_back();
            for (int d = 0; d < 4; d++) {
                int nx = x + dr[d], ny = y + dc[d];
                if (nx >= 0 && nx < rows && ny >= 0 && ny < cols) {
                    if (grid[nx][ny] == 0) {
                        grid[nx][ny] = 1;
                        stack.push_back({nx, ny});
                    }
                } else {
                    // A step off the grid means the component touches
                    // the border, so the whole island is not closed.
                    closed = false;
                }
            }
        }
        return closed;
    }
};
