class Solution {
  public:
    bool checkMove(vector<vector<string>> &board, int rMove, int cMove, string color) {
        // Walk the eight directions from the move cell: a legal move needs a
        // run of the opposite color ending in a cell of the move's color.
        char target = color[0];
        char opposite = target == 'B' ? 'W' : 'B';
        int dr[8] = {-1, -1, -1, 0, 0, 1, 1, 1};
        int dc[8] = {-1, 0, 1, -1, 1, -1, 0, 1};
        for (int d = 0; d < 8; ++d) {
            int r = rMove + dr[d], c = cMove + dc[d];
            if (r < 0 || r >= 8 || c < 0 || c >= 8 || board[r][c][0] != opposite)
                continue;
            r += dr[d];
            c += dc[d];
            while (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c][0] == opposite) {
                r += dr[d];
                c += dc[d];
            }
            if (r >= 0 && r < 8 && c >= 0 && c < 8 && board[r][c][0] == target)
                return true;
        }
        return false;
    }
};
