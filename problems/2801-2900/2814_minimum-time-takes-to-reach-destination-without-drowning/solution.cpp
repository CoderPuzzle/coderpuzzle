#include <deque>
#include <vector>

class Solution {
  public:
    int minimumSeconds(vector<vector<string>> &land) {
        const int m = static_cast<int>(land.size());
        const int n = static_cast<int>(land[0].size());
        const int INF = m * n + 1; // later than any reachable second
        int sr = 0, sc = 0, dr = 0, dc = 0;
        // Water BFS: arrival time of every empty cell. Only '.' floods,
        // so 'S', 'D' and 'X' stay dry (the statement guarantees it for
        // 'D').
        vector<vector<int>> flood(m, vector<int>(n, INF));
        deque<pair<int, int>> water;
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (land[r][c] == "*") {
                    flood[r][c] = 0;
                    water.push_back({r, c});
                } else if (land[r][c] == "S") {
                    sr = r;
                    sc = c;
                } else if (land[r][c] == "D") {
                    dr = r;
                    dc = c;
                }
            }
        }
        while (!water.empty()) {
            auto [r, c] = water.front();
            water.pop_front();
            int step = flood[r][c] + 1;
            for (auto &d : DIRS) {
                int nr = r + d[0], nc = c + d[1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n)
                    continue;
                if (land[nr][nc] != "." || flood[nr][nc] != INF)
                    continue;
                flood[nr][nc] = step;
                water.push_back({nr, nc});
            }
        }
        // Person BFS: enter '.'/'D' strictly before the water does; the
        // same-second landing ban is the strict '<'.
        vector<vector<bool>> seen(m, vector<bool>(n, false));
        deque<tuple<int, int, int>> queue; // r c t
        seen[sr][sc] = true;
        queue.push_back({sr, sc, 0});
        while (!queue.empty()) {
            auto [r, c, t] = queue.front();
            queue.pop_front();
            if (r == dr && c == dc)
                return t;
            for (auto &d : DIRS) {
                int nr = r + d[0], nc = c + d[1];
                if (nr < 0 || nr >= m || nc < 0 || nc >= n)
                    continue;
                if (seen[nr][nc])
                    continue;
                bool walk = land[nr][nc] == "." || land[nr][nc] == "D";
                if (!walk || t + 1 >= flood[nr][nc])
                    continue;
                seen[nr][nc] = true;
                queue.push_back({nr, nc, t + 1});
            }
        }
        return -1;
    }

  private:
    static constexpr int DIRS[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
};
