class Solution {
  public:
    int winningPlayerCount(int n, vector<vector<int>> &pick) {
        vector<vector<int>> counts(n, vector<int>(11, 0));
        for (auto &p : pick) {
            counts[p[0]][p[1]]++;
        }

        int winners = 0;
        for (int player = 0; player < n; player++) {
            int best = 0;
            for (int color = 0; color <= 10; color++) {
                best = max(best, counts[player][color]);
            }
            if (best > player) {
                winners++;
            }
        }
        return winners;
    }
};
