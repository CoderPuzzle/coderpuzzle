class Solution {
  public:
    int minimumObstacles(vector<vector<int>> &grid) {
        int m = grid.size();
        int n = grid[0].size();
        const int INF = INT_MAX;
        vector<vector<int>> dist(m, vector<int>(n, INF));
        dist[0][0] = 0;
        deque<pair<int, int>> dq;
        dq.push_back({0, 0});
        int di[4] = {0, 0, 1, -1};
        int dj[4] = {1, -1, 0, 0};
        while (!dq.empty()) {
            auto [i, j] = dq.front();
            dq.pop_front();
            // A popped cell is already final: the deque's distances are
            // non-decreasing, which is what replaces a priority queue.
            int d = dist[i][j];
            for (int k = 0; k < 4; k++) {
                int ni = i + di[k], nj = j + dj[k];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n) {
                    // Edge cost = grid[neighbour]: 1 to clear an obstacle,
                    // 0 for a free step, so dist is obstacles removed.
                    int nd = d + grid[ni][nj];
                    // Relax only on strict improvement — prunes stale
                    // entries and bounds how often a cell re-enters.
                    if (nd < dist[ni][nj]) {
                        dist[ni][nj] = nd;
                        // 0-1 BFS: free steps go to the front, obstacle
                        // steps to the back, keeping the deque sorted.
                        if (grid[ni][nj] == 0)
                            dq.push_front({ni, nj});
                        else
                            dq.push_back({ni, nj});
                    }
                }
            }
        }
        return dist[m - 1][n - 1];
    }
};
