class Solution {
  public:
    int minDifficulty(vector<int> &jobDifficulty, int d) {
        int n = jobDifficulty.size();
        if (n < d) {
            return -1;
        }
        const int INF = INT_MAX / 2;
        vector<vector<int>> dp(d + 1, vector<int>(n + 1, INF));
        dp[0][0] = 0;
        for (int j = 1; j <= d; j++) {
            for (int i = j; i <= n; i++) {
                int dayMax = 0;
                int best = INF;
                for (int k = i; k >= j; k--) {
                    dayMax = max(dayMax, jobDifficulty[k - 1]);
                    int prev = dp[j - 1][k - 1];
                    if (prev != INF && prev + dayMax < best) {
                        best = prev + dayMax;
                    }
                }
                dp[j][i] = best;
            }
        }
        return dp[d][n];
    }
};
