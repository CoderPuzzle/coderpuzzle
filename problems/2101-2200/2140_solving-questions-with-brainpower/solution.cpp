class Solution {
  public:
    long long mostPoints(vector<vector<int>> &questions) {
        int n = questions.size();
        // dp[i] = best score starting at question i; dp[n] = 0 is the
        // sentinel for "nothing left". Fill right to left so every future
        // value is ready before it is read.
        vector<long long> dp(n + 1, 0);
        for (int i = n - 1; i >= 0; i--) {
            long long points = questions[i][0];
            // nxt is the first question unlocked after the lockout; a jump
            // past the end reads the zero sentinel.
            int nxt = i + questions[i][1] + 1;
            long long take = points + (nxt <= n ? dp[nxt] : 0);
            // Skip keeps dp[i+1]; take solves and jumps.
            dp[i] = max(dp[i + 1], take);
        }
        return dp[0];
    }
};
