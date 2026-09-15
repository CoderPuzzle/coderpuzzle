class Solution {
  public:
    int isWinner(vector<int> &player1, vector<int> &player2) {
        // A turn is worth double the pins when either of the two previous
        // turns was a strike (10); each score is one linear pass.
        int score1 = score(player1);
        int score2 = score(player2);
        if (score1 > score2) {
            return 1;
        }
        if (score2 > score1) {
            return 2;
        }
        return 0;
    }

  private:
    int score(const vector<int> &values) {
        int total = 0;
        for (int index = 0; index < static_cast<int>(values.size()); ++index) {
            bool doubled = false;
            for (int j = max(0, index - 2); j < index; ++j) {
                if (values[j] == 10) {
                    doubled = true;
                }
            }
            total += doubled ? 2 * values[index] : values[index];
        }
        return total;
    }
};
