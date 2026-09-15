class Solution {
  public:
    int minimumEffortPath(vector<vector<int>> &heights) {
        int rows = heights.size();
        int cols = heights[0].size();
        // Bottleneck shortest path: Dijkstra with max in place of addition —
        // a path's effort is the largest height difference along it, and the
        // smallest tentative effort popped is already final.
        vector<vector<int>> dist(rows, vector<int>(cols, INT_MAX));
        dist[0][0] = 0;
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<tuple<int, int, int>>> heap;
        heap.emplace(0, 0, 0);
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!heap.empty()) {
            auto [d, r, c] = heap.top();
            heap.pop();
            // The first time the goal is popped its effort is optimal.
            if (r == rows - 1 && c == cols - 1) {
                return d;
            }
            // Stale-entry guard: skip outdated heap records.
            if (d > dist[r][c]) {
                continue;
            }
            for (auto &dir : dirs) {
                int nr = r + dir[0];
                int nc = c + dir[1];
                if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) {
                    int nd = max(d, abs(heights[nr][nc] - heights[r][c]));
                    // Relax only when the bottleneck effort strictly improves.
                    if (nd < dist[nr][nc]) {
                        dist[nr][nc] = nd;
                        heap.emplace(nd, nr, nc);
                    }
                }
            }
        }
        return 0;
    }
};
