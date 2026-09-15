class Solution {
  public:
    bool winnerSquareGame(int n) {
        // wins[i] is true exactly when the player to move, facing a pile of
        // i stones, can force a win with optimal play from both sides.
        vector<bool> wins(n + 1, false);
        for (int total = 1; total <= n; ++total) {
            for (int k = 1; k * k <= total; ++k) {
                // Removing k*k stones hands the opponent a pile of size
                // total - k*k. If that leaves the opponent in a losing
                // state, the mover wins by making this exact move.
                if (!wins[total - k * k]) {
                    wins[total] = true;
                    break;
                }
            }
        }
        return wins[n];
    }
};
