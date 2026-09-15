class Solution {
  public:
    int minTravelTime(int l, int n, int k, vector<int> &position, vector<int> &time) {
        const long long INF = LLONG_MAX / 4;
        // prefix[t] = sum of time[0..t-1]; merging a run of s removals that
        // sit directly before kept sign i folds time[i-s..i] into its rate.
        // Answers stay <= l * sum(time) <= 1e7, but widen to long long.
        vector<long long> prefix(n + 1, 0);
        for (int i = 0; i < n; ++i)
            prefix[i + 1] = prefix[i] + time[i];
        // dp[i][j][s]: sign i kept, j merges spent, s consecutive removals
        // directly before i; the outgoing segment (i -> next kept) is
        // charged when the transition is relaxed.
        vector<vector<vector<long long>>> dp(n, vector<vector<long long>>(k + 1, vector<long long>(k + 1, INF)));
        dp[0][0][0] = 0;
        for (int i = 0; i < n; ++i) {
            for (int j = 0; j <= k; ++j) {
                for (int s = 0; s <= k; ++s) {
                    long long base = dp[i][j][s];
                    if (base == INF)
                        continue;
                    long long rate = prefix[i + 1] - prefix[i - s];
                    for (int q = i + 1; q < n; ++q) {
                        int d = q - i - 1;
                        if (j + d > k)
                            break;
                        long long cost = base + static_cast<long long>(position[q] - position[i]) * rate;
                        if (cost < dp[q][j + d][d])
                            dp[q][j + d][d] = cost;
                    }
                }
            }
        }
        long long best = INF;
        for (int s = 0; s <= k; ++s)
            best = min(best, dp[n - 1][k][s]);
        return static_cast<int>(best);
    }
};
