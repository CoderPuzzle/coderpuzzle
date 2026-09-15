class Solution {
  public:
    vector<vector<int>> colorGrid(int n, int m, vector<vector<int>> &sources) {
        vector<vector<int>> grid(n, vector<int>(m, 0));
        vector<vector<int>> dist(n, vector<int>(m, -1));
        vector<pair<int, int>> queue;
        queue.reserve(n * m);
        for (auto &s : sources) {
            grid[s[0]][s[1]] = s[2];
            dist[s[0]][s[1]] = 0;
            queue.push_back({s[0], s[1]});
        }
        int di[] = {1, -1, 0, 0};
        int dj[] = {0, 0, 1, -1};
        for (size_t head = 0; head < queue.size(); head++) {
            auto [i, j] = queue[head];
            int d = dist[i][j];
            for (int t = 0; t < 4; t++) {
                int ni = i + di[t], nj = j + dj[t];
                if (0 <= ni && ni < n && 0 <= nj && nj < m) {
                    if (dist[ni][nj] == -1) {
                        dist[ni][nj] = d + 1;
                        grid[ni][nj] = grid[i][j];
                        queue.push_back({ni, nj});
                    } else if (dist[ni][nj] == d + 1) {
                        // reached at the same time step by another color
                        if (grid[i][j] > grid[ni][nj]) {
                            grid[ni][nj] = grid[i][j];
                        }
                    }
                }
            }
        }
        return grid;
    }
};
