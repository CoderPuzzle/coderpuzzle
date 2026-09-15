class Solution {
  public:
    int numDistinctIslands(vector<vector<int>> &grid) {
        // Flood-fill each island with an explicit queue. The shape is the
        // sorted set of cells relative to the first cell the row-major scan
        // meets, so translated copies produce one identical signature.
        int m = grid.size(), n = grid[0].size();
        vector<vector<bool>> seen(m, vector<bool>(n, false));
        set<vector<pair<int, int>>> shapes;
        const int rowStep[4] = {-1, 1, 0, 0};
        const int colStep[4] = {0, 0, -1, 1};
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[i][j] != 1 || seen[i][j]) {
                    continue;
                }
                seen[i][j] = true;
                vector<pair<int, int>> queue;
                vector<pair<int, int>> cells;
                queue.push_back({i, j});
                for (size_t head = 0; head < queue.size(); ++head) {
                    auto [r, c] = queue[head];
                    cells.push_back({r - i, c - j});
                    for (int k = 0; k < 4; ++k) {
                        int nr = r + rowStep[k], nc = c + colStep[k];
                        if (nr < 0 || nr >= m || nc < 0 || nc >= n || grid[nr][nc] != 1 || seen[nr][nc]) {
                            continue;
                        }
                        seen[nr][nc] = true;
                        queue.push_back({nr, nc});
                    }
                }
                sort(cells.begin(), cells.end());
                shapes.insert(cells);
            }
        }
        return shapes.size();
    }
};
