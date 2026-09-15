class Solution {
  public:
    int shortestPathBinaryMatrix(vector<vector<int>> &grid) {
        int n = grid.size();
        // Blocked corners admit no path; a 1x1 open grid needs no moves.
        if (grid[0][0] != 0 || grid[n - 1][n - 1] != 0) {
            return -1;
        }
        if (n == 1) {
            return 1;
        }
        // Unit-cost moves make BFS optimal: first arrival is a shortest path.
        // dist doubles as the visited marker; length counts cells, so start = 1.
        vector<vector<int>> dist(n, vector<int>(n, 0));
        queue<pair<int, int>> q;
        dist[0][0] = 1;
        q.push({0, 0});
        // Eight-directional neighborhood (diagonals included).
        static const int dx[] = {-1, -1, -1, 0, 0, 1, 1, 1};
        static const int dy[] = {-1, 0, 1, -1, 1, -1, 0, 1};
        while (!q.empty()) {
            auto [x, y] = q.front();
            q.pop();
            for (int d = 0; d < 8; d++) {
                int nx = x + dx[d], ny = y + dy[d];
                if (nx >= 0 && nx < n && ny >= 0 && ny < n && grid[nx][ny] == 0 && dist[nx][ny] == 0) {
                    // Early exit the moment the goal becomes reachable.
                    if (nx == n - 1 && ny == n - 1) {
                        return dist[x][y] + 1;
                    }
                    dist[nx][ny] = dist[x][y] + 1;
                    q.push({nx, ny});
                }
            }
        }
        // Queue drained without reaching the goal: no clear path.
        return -1;
    }
};
