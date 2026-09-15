class Solution {
  public:
    int swimInWater(vector<vector<int>> &grid) {
        int n = grid.size();
        // A path's cost is the max elevation along it, and max is
        // monotone, so Dijkstra's greedy argument holds with max
        // relaxation. dist holds the earliest time each cell is
        // reachable — the start waits for grid[0][0] itself.
        vector<vector<int>> dist(n, vector<int>(n, INT_MAX));
        dist[0][0] = grid[0][0];
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<tuple<int, int, int>>> heap;
        heap.push({grid[0][0], 0, 0});
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!heap.empty()) {
            auto [t, r, c] = heap.top();
            heap.pop();
            // First pop of the target is optimal: cells settle in order
            // of their true earliest time.
            if (r == n - 1 && c == n - 1)
                return t;
            // Skip stale entries superseded by a better settled time.
            if (t > dist[r][c])
                continue;
            for (auto &d : dirs) {
                int nr = r + d[0], nc = c + d[1];
                if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                    // Extending a path can only keep or raise its time.
                    int nt = max(t, grid[nr][nc]);
                    if (nt < dist[nr][nc]) {
                        dist[nr][nc] = nt;
                        heap.push({nt, nr, nc});
                    }
                }
            }
        }
        return dist[n - 1][n - 1];
    }
};
