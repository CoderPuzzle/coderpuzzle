class Solution {
  public:
    int matrixScore(vector<vector<int>> &grid) {
        // A leading 1 outweighs the rest of its row combined, so every row
        // is flipped to a 1 head and contributes 2^(n-1) up front.
        int m = grid.size();
        int n = grid[0].size();
        int score = m << (n - 1);
        for (int j = 1; j < n; ++j) {
            // After the head pass, cell (i, j) is 1 exactly where the row
            // agreed with its own head, so a toggle trades k for m - k.
            int agree = 0;
            for (const auto &row : grid) {
                if (row[j] == row[0]) {
                    ++agree;
                }
            }
            score += max(agree, m - agree) << (n - 1 - j);
        }
        return score;
    }
};
