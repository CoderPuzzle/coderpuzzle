#include <vector>

// One counter per line: rows/cols carry each player's mark count on every
// line, plus one counter per diagonal — a counter reaching n means the
// player owns the whole line, so no board is stored. Index 0 of each
// counter row stays unused so the player ids address theirs directly.
class TicTacToe {
  public:
    TicTacToe(int n) : n(n), rows(3, vector<int>(n)), cols(3, vector<int>(n)), diagonal(3), antiDiagonal(3) {}

    int move(int row, int col, int player) {
        // Only the lines through the played square can complete on this
        // move, so the counters just bumped decide the winner.
        ++rows[player][row];
        ++cols[player][col];
        if (row == col) {
            ++diagonal[player];
        }
        if (row + col == n - 1) {
            ++antiDiagonal[player];
        }
        if (rows[player][row] == n || cols[player][col] == n || diagonal[player] == n || antiDiagonal[player] == n) {
            return player;
        }
        return 0;
    }

  private:
    int n;
    vector<vector<int>> rows;
    vector<vector<int>> cols;
    vector<int> diagonal;
    vector<int> antiDiagonal;
};
