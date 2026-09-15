class Solution {
  public:
    double knightProbability(int n, int k, int row, int column) {
        // Probability-mass DP over the board. board[r][c] is the probability
        // of standing on (r, c) after the moves made so far; one gather sweep
        // advances it by one move, and mass addressed off the board is lost.
        int moves[8][2] = {{-2, -1}, {-2, 1}, {-1, -2}, {-1, 2}, {1, -2}, {1, 2}, {2, -1}, {2, 1}};
        vector<vector<double>> board(n, vector<double>(n, 0.0));
        board[row][column] = 1.0;
        for (int step = 0; step < k; ++step) {
            vector<vector<double>> next(n, vector<double>(n, 0.0));
            for (int r = 0; r < n; ++r) {
                for (int c = 0; c < n; ++c) {
                    double mass = 0.0;
                    for (auto &offset : moves) {
                        int nr = r + offset[0];
                        int nc = c + offset[1];
                        if (nr >= 0 && nr < n && nc >= 0 && nc < n) {
                            mass += board[nr][nc] / 8.0;
                        }
                    }
                    next[r][c] = mass;
                }
            }
            board = move(next);
        }
        double total = 0.0;
        for (int r = 0; r < n; ++r) {
            for (int c = 0; c < n; ++c) {
                total += board[r][c];
            }
        }
        return total;
    }
};
