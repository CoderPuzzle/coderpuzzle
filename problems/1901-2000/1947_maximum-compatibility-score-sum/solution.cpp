class Solution {
  public:
    int maxCompatibilitySum(vector<vector<int>> &students, vector<vector<int>> &mentors) {
        int m = students.size();
        // Precompute the m x m agreement counts so the DP touches only ints.
        vector<vector<int>> score(m, vector<int>(m, 0));
        for (int i = 0; i < m; i++)
            for (int j = 0; j < m; j++)
                for (int t = 0; t < (int)students[i].size(); t++)
                    if (students[i][t] == mentors[j][t])
                        score[i][j]++;
        int full = 1 << m;
        // dp[mask] = best total score matching the first popcount(mask)
        // students to exactly the mentors in mask; dp[0] = 0. The used-mentor
        // count alone pins down which student is placed next. Increasing
        // numeric order works because every submask is numerically smaller.
        vector<int> dp(full, 0);
        for (int mask = 1; mask < full; mask++) {
            int i = __builtin_popcount(mask) - 1;
            int best = 0;
            // Mentor j was this student's match: extend the assignment
            // without j by their pairwise score.
            for (int j = 0; j < m; j++)
                if (mask >> j & 1)
                    best = max(best, dp[mask ^ (1 << j)] + score[i][j]);
            dp[mask] = best;
        }
        return dp[full - 1];
    }
};
