class Solution {
  public:
    vector<vector<int>> gameOfLife(vector<vector<int>> &board) {
        int m = board.size();
        int n = board[0].size();
        // Snapshot the current generation: every neighbor count must read
        // the old states even while the board itself is being overwritten.
        vector<vector<int>> snapshot = board;
        int dr[8] = {-1, -1, -1, 0, 0, 1, 1, 1};
        int dc[8] = {-1, 0, 1, -1, 1, -1, 0, 1};
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                int live = 0;
                // Count live neighbors in the snapshot; cells outside the
                // board count as dead via the bounds check.
                for (int d = 0; d < 8; d++) {
                    int nr = r + dr[d];
                    int nc = c + dc[d];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && snapshot[nr][nc] == 1) {
                        live++;
                    }
                }
                // Rules applied to the old state: live survives on 2 or 3,
                // dead is born on exactly 3, everything else dies/stays
                // dead.
                if (snapshot[r][c] == 1) {
                    board[r][c] = (live == 2 || live == 3) ? 1 : 0;
                } else {
                    board[r][c] = (live == 3) ? 1 : 0;
                }
            }
        }
        return board;
    }
};
