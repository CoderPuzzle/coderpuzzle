class Solution {
  public:
    vector<vector<int>> highestPeak(vector<vector<int>> &isWater) {
        int m = isWater.size(), n = isWater[0].size();
        // Optimal height = distance to the nearest water: the two rules cap
        // every cell there, and assigning exactly that maximizes all cells
        // at once (neighboring distances differ by at most 1).
        vector<vector<int>> height(m, vector<int>(n, -1));
        queue<pair<int, int>> q;
        // Multi-source BFS: every water cell starts at height 0; each BFS
        // ring is one step farther from some water cell.
        for (int i = 0; i < m; i++) {
            for (int j = 0; j < n; j++) {
                if (isWater[i][j] == 1) {
                    height[i][j] = 0;
                    q.push({i, j});
                }
            }
        }
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        while (!q.empty()) {
            auto [i, j] = q.front();
            q.pop();
            for (auto &d : dirs) {
                int ni = i + d[0], nj = j + d[1];
                // height == -1 doubles as the visited marker, so each cell
                // is enqueued once, by its nearest source.
                if (ni >= 0 && ni < m && nj >= 0 && nj < n && height[ni][nj] == -1) {
                    height[ni][nj] = height[i][j] + 1;
                    q.push({ni, nj});
                }
            }
        }
        return height;
    }
};
