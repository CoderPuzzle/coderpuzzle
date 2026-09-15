class Solution {
  public:
    vector<vector<int>> pacificAtlantic(vector<vector<int>> &heights) {
        int m = heights.size();
        int n = heights[0].size();

        // Reverse the flow: walk inland from the ocean border instead of
        // downhill from every cell, so one traversal finds all draining cells.
        auto reachable = [&](const vector<pair<int, int>> &border) {
            vector<vector<bool>> seen(m, vector<bool>(n, false));
            vector<pair<int, int>> queue;
            for (auto &cell : border) {
                if (!seen[cell.first][cell.second]) {
                    seen[cell.first][cell.second] = true;
                }
                queue.push_back(cell);
            }
            int dr[4] = {1, -1, 0, 0};
            int dc[4] = {0, 0, 1, -1};
            for (size_t head = 0; head < queue.size(); head++) {
                auto [r, c] = queue[head];
                for (int d = 0; d < 4; d++) {
                    int nr = r + dr[d];
                    int nc = c + dc[d];
                    // Only a neighbor at least as tall could have flowed down
                    // into (r, c).
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && !seen[nr][nc] && heights[nr][nc] >= heights[r][c]) {
                        // Mark on enqueue so each cell enters the queue at most once.
                        seen[nr][nc] = true;
                        queue.push_back({nr, nc});
                    }
                }
            }
            return seen;
        };

        // Pacific seeds: top row + left column; Atlantic: bottom row + right
        // column. Corners appear in both seed lists.
        vector<pair<int, int>> pacificBorder;
        for (int c = 0; c < n; c++)
            pacificBorder.push_back({0, c});
        for (int r = 0; r < m; r++)
            pacificBorder.push_back({r, 0});
        vector<pair<int, int>> atlanticBorder;
        for (int c = 0; c < n; c++)
            atlanticBorder.push_back({m - 1, c});
        for (int r = 0; r < m; r++)
            atlanticBorder.push_back({r, n - 1});

        auto pacific = reachable(pacificBorder);
        auto atlantic = reachable(atlanticBorder);

        // Row-major intersection of the two reachable sets comes out sorted.
        vector<vector<int>> result;
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                if (pacific[r][c] && atlantic[r][c]) {
                    result.push_back({r, c});
                }
            }
        }
        return result;
    }
};
