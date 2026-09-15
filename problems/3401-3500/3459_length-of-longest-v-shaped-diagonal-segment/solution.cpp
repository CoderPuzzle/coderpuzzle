class Solution {
  public:
    int lenOfVDiagonal(vector<vector<int>> &grid) {
        int n = grid.size();
        int m = grid[0].size();
        // Diagonal directions in clockwise order NW, NE, SE, SW: a clockwise
        // 90-degree turn maps index d to (d + 1) % 4. Past the head '1' the
        // values alternate 2, 0, 2, 0, ..., so the other expected value of
        // e in {0, 2} is 2 - e; table index j encodes e = 2 * j.
        const int dr[4] = {-1, -1, 1, 1};
        const int dc[4] = {-1, 1, 1, -1};
        auto inB = [&](int r, int c) { return 0 <= r && r < n && 0 <= c && c < m; };
        // Straight tables: S[j][d] holds the longest run starting at each
        // cell going straight in direction d when the cell must equal 2*j;
        // M does the same allowing one clockwise turn.
        auto shape = [&]() { return vector(4, vector(n, vector<int>(m, 0))); };
        vector<decltype(shape())> S(2, shape());
        vector<decltype(shape())> M(2, shape());
        for (int d = 0; d < 4; ++d) {
            // Sweep rows against the direction so the next row is computed.
            for (int i = 0; i < n; ++i) {
                int r = dr[d] < 0 ? i : n - 1 - i;
                for (int c = 0; c < m; ++c) {
                    for (int j = 0; j < 2; ++j) {
                        if (grid[r][c] != 2 * j)
                            continue;
                        int nr = r + dr[d], nc = c + dc[d];
                        S[j][d][r][c] = 1 + (inB(nr, nc) ? S[1 - j][d][nr][nc] : 0);
                    }
                }
            }
        }
        // One-turn tables: continue straight in direction d, or make the
        // single clockwise turn and hand over to the straight tables of
        // direction (d + 1) % 4.
        for (int d = 0; d < 4; ++d) {
            int cw = (d + 1) % 4;
            for (int i = 0; i < n; ++i) {
                int r = dr[d] < 0 ? i : n - 1 - i;
                for (int c = 0; c < m; ++c) {
                    for (int j = 0; j < 2; ++j) {
                        if (grid[r][c] != 2 * j)
                            continue;
                        int nr = r + dr[d], nc = c + dc[d];
                        int tr = r + dr[cw], tc = c + dc[cw];
                        int best = inB(nr, nc) ? M[1 - j][d][nr][nc] : 0;
                        if (inB(tr, tc))
                            best = max(best, S[1 - j][cw][tr][tc]);
                        M[j][d][r][c] = 1 + best;
                    }
                }
            }
        }
        // A head '1' plus the best one-turn run over its four first steps.
        int ans = 0;
        for (int r = 0; r < n; ++r) {
            for (int c = 0; c < m; ++c) {
                if (grid[r][c] != 1)
                    continue;
                int best = 0;
                for (int d = 0; d < 4; ++d) {
                    int nr = r + dr[d], nc = c + dc[d];
                    if (inB(nr, nc))
                        best = max(best, M[1][d][nr][nc]);
                }
                ans = max(ans, 1 + best);
            }
        }
        return ans;
    }
};
