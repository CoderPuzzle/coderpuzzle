class Solution {
  public:
    int getFood(vector<vector<string>> &grid) {
        int m = grid.size(), n = grid[0].size();
        int sr = -1, sc = -1;
        for (int i = 0; i < m && sr == -1; i++) {
            for (int j = 0; j < n; j++) {
                if (grid[i][j] == "*") {
                    sr = i;
                    sc = j;
                    break;
                }
            }
        }
        vector<vector<int>> dist(m, vector<int>(n, -1));
        dist[sr][sc] = 0;
        queue<pair<int, int>> q;
        q.push({sr, sc});
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!q.empty()) {
            auto [i, j] = q.front();
            q.pop();
            if (grid[i][j] == "#")
                return dist[i][j];
            for (auto &d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && grid[ni][nj] != "X" && dist[ni][nj] == -1) {
                    dist[ni][nj] = dist[i][j] + 1;
                    q.push({ni, nj});
                }
            }
        }
        return -1;
    }
};
