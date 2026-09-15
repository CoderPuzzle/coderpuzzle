#include <queue>
#include <vector>

class Solution {
  public:
    vector<vector<int>> findFarmland(vector<vector<int>> &land) {
        // Iterative BFS per unvisited farmland cell: flood the component and
        // track the min/max row and column, which for a rectangular group is
        // exactly its top-left and bottom-right corner.
        int m = land.size(), n = land[0].size();
        vector<vector<bool>> seen(m, vector<bool>(n, false));
        vector<vector<int>> groups;
        int dr[4] = {1, -1, 0, 0};
        int dc[4] = {0, 0, 1, -1};
        for (int r = 0; r < m; ++r) {
            for (int c = 0; c < n; ++c) {
                if (land[r][c] != 1 || seen[r][c])
                    continue;
                seen[r][c] = true;
                queue<pair<int, int>> q;
                q.push({r, c});
                int minR = r, maxR = r, minC = c, maxC = c;
                while (!q.empty()) {
                    auto [cr, cc] = q.front();
                    q.pop();
                    minR = min(minR, cr);
                    maxR = max(maxR, cr);
                    minC = min(minC, cc);
                    maxC = max(maxC, cc);
                    for (int d = 0; d < 4; ++d) {
                        int nr = cr + dr[d], nc = cc + dc[d];
                        if (0 <= nr && nr < m && 0 <= nc && nc < n && land[nr][nc] == 1 && !seen[nr][nc]) {
                            seen[nr][nc] = true;
                            q.push({nr, nc});
                        }
                    }
                }
                groups.push_back({minR, minC, maxR, maxC});
            }
        }
        return groups;
    }
};
