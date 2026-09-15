class Solution {
  public:
    vector<vector<int>> gameOfLife(vector<vector<int>> &board) {
        int m = board.size();
        int n = board[0].size();
        int dr[8] = {-1, -1, -1, 0, 0, 1, 1, 1};
        int dc[8] = {-1, 0, 1, -1, 1, -1, 0, 1};
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                int live = 0;
                for (int d = 0; d < 8; d++) {
                    int nr = r + dr[d];
                    int nc = c + dc[d];
                    if (nr >= 0 && nr < m && nc >= 0 && nc < n && (board[nr][nc] == 1 || board[nr][nc] == 2)) {
                        live++;
                    }
                }
                if (board[r][c] == 1 && (live < 2 || live > 3)) {
                    board[r][c] = 2; // live -> dead
                } else if (board[r][c] == 0 && live == 3) {
                    board[r][c] = 3; // dead -> live
                }
            }
        }
        for (int r = 0; r < m; r++) {
            for (int c = 0; c < n; c++) {
                board[r][c] = (board[r][c] == 1 || board[r][c] == 3) ? 1 : 0;
            }
        }
        return board;
    }
};
