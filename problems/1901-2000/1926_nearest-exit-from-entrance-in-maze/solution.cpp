class Solution {
  public:
    int nearestExit(vector<vector<string>> &maze, vector<int> &entrance) {
        int m = maze.size(), n = maze[0].size();
        int er = entrance[0], ec = entrance[1];
        // Every move costs one step, so plain BFS from the entrance visits
        // cells in order of increasing distance; dist doubles as the visited
        // set via its -1 sentinel.
        vector<vector<int>> dist(m, vector<int>(n, -1));
        dist[er][ec] = 0;
        queue<pair<int, int>> q;
        q.push({er, ec});
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!q.empty()) {
            auto [i, j] = q.front();
            q.pop();
            // Test on pop, not push: this cleanly skips the entrance itself
            // while returning the correct distance for any other border cell.
            if ((i == 0 || i == m - 1 || j == 0 || j == n - 1) && !(i == er && j == ec)) {
                return dist[i][j];
            }
            for (auto &d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && maze[ni][nj] == "." && dist[ni][nj] == -1) {
                    // Assigning distance at enqueue time is what keeps the
                    // queue ordered by distance.
                    dist[ni][nj] = dist[i][j] + 1;
                    q.push({ni, nj});
                }
            }
        }
        // Queue drained without dequeuing any exit: no reachable exit exists.
        return -1;
    }
};
