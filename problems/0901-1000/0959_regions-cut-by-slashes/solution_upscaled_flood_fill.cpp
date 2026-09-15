class Solution {
  public:
    int regionsBySlashes(vector<string> &grid) {
        // Blow every square up into a 3x3 block and paint its wall as
        // blocked pixels along the block's diagonal: '/' fills the
        // anti-diagonal, '\' the main diagonal, a blank fills nothing.
        // Corner contacts survive the upscale because the diagonals of two
        // blocks meeting at a corner leave the pixels beside them open, so
        // the regions are just the connected components of open pixels — an
        // explicit-stack flood fill counts them.
        int n = grid.size();
        int size = 3 * n;
        vector<vector<bool>> blocked(size, vector<bool>(size, false));
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j < n; ++j) {
                char ch = grid[i][j];
                if (ch == '/') {
                    blocked[3 * i][3 * j + 2] = true;
                    blocked[3 * i + 1][3 * j + 1] = true;
                    blocked[3 * i + 2][3 * j] = true;
                } else if (ch == '\\') {
                    blocked[3 * i][3 * j] = true;
                    blocked[3 * i + 1][3 * j + 1] = true;
                    blocked[3 * i + 2][3 * j + 2] = true;
                }
            }
        }
        // One flood fill per unvisited open pixel; each fill claims exactly
        // one region, so the number of fills is the answer.
        vector<vector<bool>> seen(size, vector<bool>(size, false));
        vector<int> stack;
        int dr[4] = {-1, 1, 0, 0};
        int dc[4] = {0, 0, -1, 1};
        int regions = 0;
        for (int r = 0; r < size; ++r) {
            for (int c = 0; c < size; ++c) {
                if (blocked[r][c] || seen[r][c]) {
                    continue;
                }
                ++regions;
                seen[r][c] = true;
                stack.clear();
                stack.push_back(r * size + c);
                while (!stack.empty()) {
                    int cell = stack.back();
                    stack.pop_back();
                    int cr = cell / size;
                    int cc = cell % size;
                    for (int d = 0; d < 4; ++d) {
                        int nr = cr + dr[d];
                        int nc = cc + dc[d];
                        if (nr >= 0 && nr < size && nc >= 0 && nc < size && !blocked[nr][nc] && !seen[nr][nc]) {
                            seen[nr][nc] = true;
                            stack.push_back(nr * size + nc);
                        }
                    }
                }
            }
        }
        return regions;
    }
};
