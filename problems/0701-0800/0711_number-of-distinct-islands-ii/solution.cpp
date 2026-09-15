class Solution {
  public:
    int numDistinctIslands2(vector<vector<int>> &grid) {
        // Flood-fill each island with an explicit stack, then name the shape by
        // the lexicographically smallest normalized cell list among its eight
        // rotations and reflections: two islands share a name exactly when one
        // maps onto the other under the statement's rule.
        int m = grid.size(), n = grid[0].size();
        vector<vector<bool>> seen(m, vector<bool>(n, false));
        set<vector<pair<int, int>>> shapes;
        const int rowStep[4] = {-1, 1, 0, 0};
        const int colStep[4] = {0, 0, -1, 1};
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[i][j] != 1 || seen[i][j]) {
                    continue;
                }
                seen[i][j] = true;
                vector<pair<int, int>> stack;
                vector<pair<int, int>> cells;
                stack.push_back({i, j});
                while (!stack.empty()) {
                    auto [r, c] = stack.back();
                    stack.pop_back();
                    cells.push_back({r, c});
                    for (int k = 0; k < 4; ++k) {
                        int nr = r + rowStep[k], nc = c + colStep[k];
                        if (nr < 0 || nr >= m || nc < 0 || nc >= n || grid[nr][nc] != 1 || seen[nr][nc]) {
                            continue;
                        }
                        seen[nr][nc] = true;
                        stack.push_back({nr, nc});
                    }
                }
                const int sign[2] = {1, -1};
                vector<pair<int, int>> best;
                for (int t = 0; t < 8; ++t) {
                    int a = sign[t & 1], b = sign[(t >> 1) & 1];
                    bool swap = (t & 4) != 0;
                    vector<pair<int, int>> moved;
                    moved.reserve(cells.size());
                    int r0 = INT_MAX, c0 = INT_MAX;
                    for (auto [r, c] : cells) {
                        int nr = a * (swap ? c : r);
                        int nc = b * (swap ? r : c);
                        moved.push_back({nr, nc});
                        r0 = min(r0, nr);
                        c0 = min(c0, nc);
                    }
                    for (auto &cell : moved) {
                        cell.first -= r0;
                        cell.second -= c0;
                    }
                    sort(moved.begin(), moved.end());
                    if (best.empty() || moved < best) {
                        best = moved;
                    }
                }
                shapes.insert(best);
            }
        }
        return shapes.size();
    }
};
