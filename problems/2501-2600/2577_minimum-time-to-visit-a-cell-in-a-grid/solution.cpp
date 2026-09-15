class Solution {
  public:
    int minimumTime(vector<vector<int>> &grid) {
        int m = (int)grid.size();
        int n = (int)grid[0].size();
        if (m == 1 && n == 1) {
            return 0;
        }
        // If both neighbours of the start cell demand more than 1s we can never
        // leave the start (no adjacent cell to wait on).
        bool canRight = n > 1 && grid[0][1] <= 1;
        bool canDown = m > 1 && grid[1][0] <= 1;
        if (!canRight && !canDown) {
            return -1;
        }

        vector<vector<int>> dist(m, vector<int>(n, INT_MAX));
        dist[0][0] = 0;
        priority_queue<tuple<int, int, int>, vector<tuple<int, int, int>>, greater<tuple<int, int, int>>> heap;
        heap.push({0, 0, 0});
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};
        while (!heap.empty()) {
            auto [t, r, c] = heap.top();
            heap.pop();
            if (t != dist[r][c]) {
                continue;
            }
            if (r == m - 1 && c == n - 1) {
                return t;
            }
            for (int d = 0; d < 4; d++) {
                int nr = r + dr[d], nc = c + dc[d];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n) {
                    continue;
                }
                int nt = t + 1;
                if (nt < grid[nr][nc]) {
                    if ((grid[nr][nc] - nt) % 2 == 0) {
                        nt = grid[nr][nc];
                    } else {
                        nt = grid[nr][nc] + 1;
                    }
                }
                if (nt < dist[nr][nc]) {
                    dist[nr][nc] = nt;
                    heap.push({nt, nr, nc});
                }
            }
        }
        return -1;
    }
};
