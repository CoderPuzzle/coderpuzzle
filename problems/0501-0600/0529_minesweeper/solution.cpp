class Solution {
  public:
    vector<vector<string>> updateBoard(vector<vector<string>> &board, vector<int> &click) {
        // A revealed mine ends the game on the spot: it becomes 'X' and no
        // other cell changes, so return before any flood starts.
        int rows = board.size();
        int cols = board[0].size();
        int r0 = click[0];
        int c0 = click[1];
        if (board[r0][c0] == "M") {
            board[r0][c0] = "X";
            return board;
        }
        // Breadth-first reveal from the clicked square, on an explicit queue:
        // a blank region can span every cell of a 50 x 50 board, deeper than
        // recursion would safely go.
        const int dr[8] = {-1, -1, -1, 0, 0, 1, 1, 1};
        const int dc[8] = {-1, 0, 1, -1, 1, -1, 0, 1};
        vector<pair<int, int>> queue;
        queue.push_back({r0, c0});
        size_t head = 0;
        while (head < queue.size()) {
            auto [r, c] = queue[head++];
            // Two blanks can enqueue the same neighbor; only its first
            // processing reveals it, and this check drops the stale copy.
            if (board[r][c] != "E") {
                continue;
            }
            // An empty square's face is its count of adjacent mines, and
            // that count is exactly what bounds the flood.
            int mines = 0;
            for (int k = 0; k < 8; ++k) {
                int nr = r + dr[k];
                int nc = c + dc[k];
                if (0 <= nr && nr < rows && 0 <= nc && nc < cols && board[nr][nc] == "M") {
                    ++mines;
                }
            }
            if (mines > 0) {
                // Digits are the frontier of the flood: they stop it.
                board[r][c] = to_string(mines);
                continue;
            }
            board[r][c] = "B";
            for (int k = 0; k < 8; ++k) {
                int nr = r + dr[k];
                int nc = c + dc[k];
                if (0 <= nr && nr < rows && 0 <= nc && nc < cols && board[nr][nc] == "E") {
                    queue.push_back({nr, nc});
                }
            }
        }
        // The reveal happened inside the input allocation; the same board,
        // now revealed, is what the judge compares.
        return board;
    }
};
