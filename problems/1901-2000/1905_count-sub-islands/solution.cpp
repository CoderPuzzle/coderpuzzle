class Solution {
  public:
    int countSubIslands(vector<vector<int>> &grid1, vector<vector<int>> &grid2) {
        int m = grid2.size(), n = grid2[0].size();
        vector<vector<bool>> seen(m, vector<bool>(n, false));
        int count = 0;
        int dirs[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        for (int si = 0; si < m; si++) {
            for (int sj = 0; sj < n; sj++) {
                // An unseen grid2 land cell starts a fresh island: it is a sub-island
                // iff EVERY one of its cells is also land in grid1 — no island
                // matching between the grids is needed.
                if (grid2[si][sj] == 1 && !seen[si][sj]) {
                    seen[si][sj] = true;
                    // Explicit stack (not recursion): 500x500 grids would overflow it.
                    vector<pair<int, int>> stack{{si, sj}};
                    bool isSub = true;
                    while (!stack.empty()) {
                        auto [x, y] = stack.back();
                        stack.pop_back();
                        // One water cell in grid1 disqualifies the whole island
                        // (the flag is only read after the fill completes).
                        if (grid1[x][y] != 1)
                            isSub = false;
                        for (auto &d : dirs) {
                            int nx = x + d[0], ny = y + d[1];
                            if (nx >= 0 && nx < m && ny >= 0 && ny < n && grid2[nx][ny] == 1 && !seen[nx][ny]) {
                                // Mark at push time so no cell is ever enqueued twice.
                                seen[nx][ny] = true;
                                stack.push_back({nx, ny});
                            }
                        }
                    }
                    if (isSub)
                        count++;
                }
            }
        }
        return count;
    }
};
