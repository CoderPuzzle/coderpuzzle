class Solution {
  public:
    int numRookCaptures(vector<vector<string>> &board) {
        int rookRow = -1, rookCol = -1;
        for (int row = 0; row < 8; ++row) {
            for (int col = 0; col < 8; ++col) {
                if (board[row][col] == "R") {
                    rookRow = row;
                    rookCol = col;
                }
            }
        }

        int directions[4][2] = {{1, 0}, {-1, 0}, {0, 1}, {0, -1}};
        int captures = 0;
        for (auto &direction : directions) {
            int row = rookRow + direction[0], col = rookCol + direction[1];
            // Walk while the path is still empty; stop at the first piece or the edge.
            while (row >= 0 && row < 8 && col >= 0 && col < 8 && board[row][col] == ".") {
                row += direction[0];
                col += direction[1];
            }
            if (row >= 0 && row < 8 && col >= 0 && col < 8 && board[row][col] == "p")
                ++captures;
        }
        return captures;
    }
};
