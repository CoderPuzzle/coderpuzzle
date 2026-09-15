#include <cstdlib>
#include <string>
#include <vector>

class Solution {
  public:
    std::string tictactoe(std::vector<std::vector<int>> &moves) {
        // Tally each player's occupancy per row and column as moves land,
        // diagonals directly (+1 for A, -1 for B); a tally reaching +-3 is
        // a completed line. In a valid transcript the game stops at the
        // first completed line, so the mover who completes one wins on the
        // spot and later moves cannot exist.
        int rows[3] = {0, 0, 0};
        int cols[3] = {0, 0, 0};
        int diag = 0;
        int anti = 0;
        for (int i = 0; i < static_cast<int>(moves.size()); i++) {
            int r = moves[i][0];
            int c = moves[i][1];
            int step = i % 2 == 0 ? 1 : -1;
            rows[r] += step;
            cols[c] += step;
            if (r == c) {
                diag += step;
            }
            if (r + c == 2) {
                anti += step;
            }
            int reach =
                std::max(std::max(std::abs(rows[r]), std::abs(cols[c])), std::max(std::abs(diag), std::abs(anti)));
            if (reach == 3) {
                return step == 1 ? "A" : "B";
            }
        }
        return moves.size() == 9 ? "Draw" : "Pending";
    }
};
