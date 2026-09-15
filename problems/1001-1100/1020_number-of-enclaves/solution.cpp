class Solution {
  public:
    int numEnclaves(vector<vector<int>> &grid) {
        int rows = (int)grid.size();
        int cols = (int)grid[0].size();
        // Iterative BFS (explicit queue, not recursion) starting from every
        // land cell already sitting on the boundary: that land can trivially
        // walk off the grid, and so can every land cell it can reach.
        queue<pair<int, int>> q;
        for (int r = 0; r < rows; ++r) {
            for (int c = 0; c < cols; ++c) {
                bool onBoundary = r == 0 || r == rows - 1 || c == 0 || c == cols - 1;
                if (onBoundary && grid[r][c] == 1) {
                    q.push({r, c});
                    grid[r][c] = 0;
                }
            }
        }

        int directions[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!q.empty()) {
            auto [r, c] = q.front();
            q.pop();
            for (auto &direction : directions) {
                int nr = r + direction[0];
                int nc = c + direction[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && grid[nr][nc] == 1) {
                    grid[nr][nc] = 0;
                    q.push({nr, nc});
                }
            }
        }

        // Whatever land the fill never reached could never walk off the
        // grid: that's exactly the enclosed count.
        int count = 0;
        for (auto &row : grid) {
            for (int cell : row) {
                count += cell;
            }
        }
        return count;
    }
};
