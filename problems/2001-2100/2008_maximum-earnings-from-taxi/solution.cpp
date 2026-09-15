class Solution {
  public:
    long long maxTaxiEarnings(int n, vector<vector<int>> &rides) {
        vector<vector<pair<int, long long>>> ending(n + 1);
        for (const auto &ride : rides) {
            ending[ride[1]].push_back({ride[0], (long long)ride[1] - ride[0] + ride[2]});
        }

        vector<long long> dp(n + 1);
        for (int point = 1; point <= n; ++point) {
            dp[point] = dp[point - 1];
            for (const auto &[start, profit] : ending[point]) {
                dp[point] = max(dp[point], dp[start] + profit);
            }
        }
        return dp[n];
    }
};
