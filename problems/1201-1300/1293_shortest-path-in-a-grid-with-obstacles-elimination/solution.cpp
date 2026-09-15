class Solution {
  public:
    int shortestPath(vector<vector<int>> &grid, int k) {
        int m = grid.size(), n = grid[0].size();
        if (k >= m + n - 2) {
            return m + n - 2;
        }
        vector<vector<vector<char>>> seen(m, vector<vector<char>>(n, vector<char>(k + 1, 0)));
        queue<array<int, 3>> q;
        q.push({0, 0, k});
        seen[0][0][k] = 1;
        int steps = 0;
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!q.empty()) {
            for (int sz = q.size(); sz > 0; sz--) {
                auto [x, y, rem] = q.front();
                q.pop();
                if (x == m - 1 && y == n - 1) {
                    return steps;
                }
                for (auto &d : dirs) {
                    int nx = x + d[0], ny = y + d[1];
                    if (nx >= 0 && nx < m && ny >= 0 && ny < n) {
                        int nr = rem - grid[nx][ny];
                        if (nr >= 0 && !seen[nx][ny][nr]) {
                            seen[nx][ny][nr] = 1;
                            q.push({nx, ny, nr});
                        }
                    }
                }
            }
            steps++;
        }
        return -1;
    }
};
