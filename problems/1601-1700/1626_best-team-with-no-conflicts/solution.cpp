class Solution {
  public:
    int bestTeamScore(vector<int> &scores, vector<int> &ages) {
        int n = scores.size();
        vector<int> order(n);
        for (int i = 0; i < n; i++) {
            order[i] = i;
        }
        // Sort player indices by age, breaking ties by score, so any
        // conflict-free team becomes a non-decreasing run of scores.
        sort(order.begin(), order.end(), [&](int a, int b) {
            if (ages[a] != ages[b]) {
                return ages[a] < ages[b];
            }
            return scores[a] < scores[b];
        });

        vector<int> sortedScores(n);
        for (int i = 0; i < n; i++) {
            sortedScores[i] = scores[order[i]];
        }

        // dp[i] = best total for a team ending at player i (in sorted order).
        vector<int> dp(n);
        int best = 0;
        for (int i = 0; i < n; i++) {
            dp[i] = sortedScores[i];
            for (int j = 0; j < i; j++) {
                if (sortedScores[j] <= sortedScores[i]) {
                    dp[i] = max(dp[i], dp[j] + sortedScores[i]);
                }
            }
            best = max(best, dp[i]);
        }
        return best;
    }
};
