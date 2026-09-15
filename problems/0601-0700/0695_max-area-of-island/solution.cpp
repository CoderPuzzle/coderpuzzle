class Solution {
  public:
    int maxAreaOfIsland(vector<vector<int>> &grid) {
        // Sweep row-major: every island is discovered exactly once, at the
        // first cell the scan meets, and counted by flooding it with an
        // explicit queue. Iterating rather than recursing is the point — a
        // snake-shaped island at the bound chains thousands of cells deep,
        // far past any call stack a submission is granted.
        int m = grid.size();
        int n = grid[0].size();
        vector<vector<bool>> seen(m, vector<bool>(n, false));
        // Cells packed as r * n + c in one flat queue, reused per island.
        vector<int> queue(m * n);
        int best = 0;
        for (int i = 0; i < m; ++i) {
            for (int j = 0; j < n; ++j) {
                if (grid[i][j] != 1 || seen[i][j]) {
                    continue;
                }
                seen[i][j] = true;
                int tail = 0;
                int head = 0;
                queue[tail++] = i * n + j;
                int area = 0;
                // A cell is marked when it enters the queue, never when it
                // leaves, so no cell is ever enqueued twice.
                while (head < tail) {
                    int cell = queue[head++];
                    int r = cell / n;
                    int c = cell % n;
                    ++area;
                    if (r > 0 && grid[r - 1][c] == 1 && !seen[r - 1][c]) {
                        seen[r - 1][c] = true;
                        queue[tail++] = cell - n;
                    }
                    if (r + 1 < m && grid[r + 1][c] == 1 && !seen[r + 1][c]) {
                        seen[r + 1][c] = true;
                        queue[tail++] = cell + n;
                    }
                    if (c > 0 && grid[r][c - 1] == 1 && !seen[r][c - 1]) {
                        seen[r][c - 1] = true;
                        queue[tail++] = cell - 1;
                    }
                    if (c + 1 < n && grid[r][c + 1] == 1 && !seen[r][c + 1]) {
                        seen[r][c + 1] = true;
                        queue[tail++] = cell + 1;
                    }
                }
                best = max(best, area);
            }
        }
        return best;
    }
};
