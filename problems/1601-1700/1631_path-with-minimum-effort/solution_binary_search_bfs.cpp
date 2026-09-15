class Solution {
  public:
    int minimumEffortPath(vector<vector<int>> &heights) {
        int rows = heights.size();
        int cols = heights[0].size();
        // hi = the largest adjacent height difference: no path can force a
        // bigger step. A 1x1 grid has no edges, so hi stays 0 and the loop
        // below never runs.
        int hi = 0;
        for (int r = 0; r < rows; r++) {
            for (int c = 0; c < cols; c++) {
                if (r + 1 < rows)
                    hi = max(hi, abs(heights[r + 1][c] - heights[r][c]));
                if (c + 1 < cols)
                    hi = max(hi, abs(heights[r][c + 1] - heights[r][c]));
            }
        }
        int lo = 0;
        // Feasibility is monotone in the cap: a path that fits under a cap
        // still fits under any larger one, so binary search applies.
        while (lo < hi) {
            int mid = lo + (hi - lo) / 2;
            if (reachable(heights, rows, cols, mid))
                hi = mid;
            else
                lo = mid + 1;
        }
        return lo;
    }

  private:
    bool reachable(vector<vector<int>> &heights, int rows, int cols, int cap) {
        vector<vector<char>> visited(rows, vector<char>(cols, 0));
        visited[0][0] = 1;
        vector<pair<int, int>> queue;
        queue.push_back({0, 0});
        int dx[] = {1, -1, 0, 0};
        int dy[] = {0, 0, 1, -1};
        for (size_t head = 0; head < queue.size(); head++) {
            auto [r, c] = queue[head];
            if (r == rows - 1 && c == cols - 1)
                return true;
            for (int k = 0; k < 4; k++) {
                int nr = r + dx[k], nc = c + dy[k];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc] &&
                    // Only steps within the current cap may be crossed.
                    abs(heights[nr][nc] - heights[r][c]) <= cap) {
                    visited[nr][nc] = 1;
                    queue.push_back({nr, nc});
                }
            }
        }
        return false;
    }
};
