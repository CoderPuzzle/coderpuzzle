class Solution {
  public:
    int findMaxFish(vector<vector<int>> &grid) {
        // Every unvisited water cell seeds one flood fill that totals the
        // fish of its connected component; the best component total wins.
        int rows = static_cast<int>(grid.size());
        int columns = static_cast<int>(grid[0].size());
        vector<vector<bool>> visited(rows, vector<bool>(columns, false));
        int best = 0;
        for (int start_row = 0; start_row < rows; ++start_row) {
            for (int start_column = 0; start_column < columns; ++start_column) {
                if (grid[start_row][start_column] == 0 || visited[start_row][start_column]) {
                    continue;
                }
                visited[start_row][start_column] = true;
                vector<pair<int, int>> stack{{start_row, start_column}};
                int total = 0;
                while (!stack.empty()) {
                    auto [r, c] = stack.back();
                    stack.pop_back();
                    total += grid[r][c];
                    for (auto [dr, dc] : {pair{1, 0}, pair{-1, 0}, pair{0, 1}, pair{0, -1}}) {
                        int nr = r + dr;
                        int nc = c + dc;
                        if (nr >= 0 && nr < rows && nc >= 0 && nc < columns && grid[nr][nc] > 0 && !visited[nr][nc]) {
                            visited[nr][nc] = true;
                            stack.emplace_back(nr, nc);
                        }
                    }
                }
                best = max(best, total);
            }
        }
        return best;
    }
};
