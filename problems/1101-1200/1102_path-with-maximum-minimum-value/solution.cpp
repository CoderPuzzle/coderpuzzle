class Solution {
  public:
    int maximumMinimumPath(vector<vector<int>> &grid) {
        int rows = grid.size();
        int cols = grid[0].size();
        // Max-heap on the cell value (tuple comparison starts with the value).
        // Best-first on the highest-valued frontier cell: taking the largest
        // candidate can never lower the running minimum, so the first arrival
        // at the goal carries the maximum bottleneck (Dijkstra with max).
        priority_queue<tuple<int, int, int>> heap;
        vector<vector<bool>> visited(rows, vector<bool>(cols, false));
        visited[0][0] = true;
        heap.emplace(grid[0][0], 0, 0);
        int best = grid[0][0];
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!heap.empty()) {
            auto [value, r, c] = heap.top();
            heap.pop();
            // best is the bottleneck (running minimum) of the walk so far.
            best = min(best, value);
            if (r == rows - 1 && c == cols - 1) {
                return best;
            }
            for (auto &dir : dirs) {
                int nr = r + dir[0];
                int nc = c + dir[1];
                // Mark visited on push so each cell enters the heap at most once.
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && !visited[nr][nc]) {
                    visited[nr][nc] = true;
                    heap.emplace(grid[nr][nc], nr, nc);
                }
            }
        }
        return best;
    }
};
