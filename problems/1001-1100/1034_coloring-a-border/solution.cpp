class Solution {
  public:
    vector<vector<int>> colorBorder(vector<vector<int>> &grid, int row, int col, int color) {
        // Identify the whole connected component first (BFS with an
        // explicit queue — depth safety), classifying each member's
        // border status against the ORIGINAL grid values. Only after
        // every member has been classified does a second pass repaint
        // the collected border cells, so an in-progress repaint can
        // never corrupt a later cell's neighbor check.
        int m = grid.size();
        int n = grid[0].size();
        int original = grid[row][col];
        vector<bool> visited(m * n, false);
        vector<int> queue(m * n);
        vector<int> border(m * n);
        int borderCount = 0;
        int head = 0;
        int tail = 0;
        visited[row * n + col] = true;
        queue[tail++] = row * n + col;
        while (head < tail) {
            int cell = queue[head++];
            int r = cell / n;
            int c = cell % n;
            bool isBorder = r == 0 || r == m - 1 || c == 0 || c == n - 1;
            if (r > 0) {
                if (grid[r - 1][c] != original) {
                    isBorder = true;
                } else if (!visited[cell - n]) {
                    visited[cell - n] = true;
                    queue[tail++] = cell - n;
                }
            }
            if (r + 1 < m) {
                if (grid[r + 1][c] != original) {
                    isBorder = true;
                } else if (!visited[cell + n]) {
                    visited[cell + n] = true;
                    queue[tail++] = cell + n;
                }
            }
            if (c > 0) {
                if (grid[r][c - 1] != original) {
                    isBorder = true;
                } else if (!visited[cell - 1]) {
                    visited[cell - 1] = true;
                    queue[tail++] = cell - 1;
                }
            }
            if (c + 1 < n) {
                if (grid[r][c + 1] != original) {
                    isBorder = true;
                } else if (!visited[cell + 1]) {
                    visited[cell + 1] = true;
                    queue[tail++] = cell + 1;
                }
            }
            if (isBorder) {
                border[borderCount++] = cell;
            }
        }
        for (int i = 0; i < borderCount; i++) {
            int cell = border[i];
            grid[cell / n][cell % n] = color;
        }
        return grid;
    }
};
