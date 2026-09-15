class Solution {
  public:
    int uniquePathsIII(vector<vector<int>> &grid) {
        // A qualifying walk steps on every non-obstacle square exactly once
        // and reaches the ending square last — a Hamiltonian path of the
        // walkable squares, counted by walking every candidate. m * n is at
        // most 20, so one integer is the visited set: bit r * n + c. The
        // scan finds the start and builds `full`, the mask of every
        // walkable square; a walk counts exactly when it steps onto the
        // ending square with mask == full.
        int m = grid.size();
        int n = grid[0].size();
        int full = 0;
        int startR = 0;
        int startC = 0;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[i][j] != -1) {
                    full |= 1 << (i * n + j);
                }
                if (grid[i][j] == 1) {
                    startR = i;
                    startC = j;
                }
            }
        }
        return dfs(grid, m, n, startR, startC, 1 << (startR * n + startC), full);
    }

  private:
    // No square may be walked twice, so meeting the ending square ends the
    // walk whether or not it is complete.
    int dfs(vector<vector<int>> &grid, int m, int n, int r, int c, int mask, int full) {
        if (grid[r][c] == 2) {
            return mask == full ? 1 : 0;
        }
        int paths = 0;
        const int steps[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
        for (const auto &step : steps) {
            int nr = r + step[0];
            int nc = c + step[1];
            if (nr < 0 || nr >= m || nc < 0 || nc >= n || grid[nr][nc] == -1) {
                continue;
            }
            int bit = 1 << (nr * n + nc);
            if (!(mask & bit)) {
                paths += dfs(grid, m, n, nr, nc, mask | bit, full);
            }
        }
        return paths;
    }
};
