class Solution {
  public:
    vector<vector<int>> tourOfKnight(int m, int n, int r, int c) {
        vector<vector<int>> board(m, vector<int>(n, -1));
        board[r][c] = 0;
        walk(board, m, n, r, c, 1);
        return board;
    }

  private:
    static bool walk(vector<vector<int>> &board, int m, int n, int row, int col, int order) {
        static const int dr[8] = {1, 2, 2, 1, -1, -2, -2, -1};
        static const int dc[8] = {2, 1, -1, -2, -2, -1, 1, 2};
        if (order == m * n) {
            return true;
        }
        vector<vector<int>> choices;
        for (int k = 0; k < 8; ++k) {
            int nr = row + dr[k];
            int nc = col + dc[k];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] == -1) {
                choices.push_back({onward(board, m, n, nr, nc), nr, nc});
            }
        }
        sort(choices.begin(), choices.end());
        for (const vector<int> &choice : choices) {
            board[choice[1]][choice[2]] = order;
            if (walk(board, m, n, choice[1], choice[2], order + 1)) {
                return true;
            }
            board[choice[1]][choice[2]] = -1;
        }
        return false;
    }

    static int onward(vector<vector<int>> &board, int m, int n, int row, int col) {
        static const int dr[8] = {1, 2, 2, 1, -1, -2, -2, -1};
        static const int dc[8] = {2, 1, -1, -2, -2, -1, 1, 2};
        int count = 0;
        for (int k = 0; k < 8; ++k) {
            int nr = row + dr[k];
            int nc = col + dc[k];
            if (nr >= 0 && nr < m && nc >= 0 && nc < n && board[nr][nc] == -1) {
                ++count;
            }
        }
        return count;
    }
};
