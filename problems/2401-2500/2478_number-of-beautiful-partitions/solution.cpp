class Solution {
  public:
    int beautifulPartitions(string s, int k, int minLength) {
        const long long MOD = 1000000007LL;
        auto isP = [](char c) { return c == '2' || c == '3' || c == '5' || c == '7'; };
        int n = (int)s.size();
        vector<vector<long long>> dp(n + 1, vector<long long>(k + 1, 0));
        dp[0][0] = 1;
        for (int j = 1; j <= k; j++) {
            vector<long long> prefix(n + 1, 0);
            for (int x = 0; x < n; x++) {
                prefix[x + 1] = prefix[x];
                if (isP(s[x])) {
                    prefix[x + 1] += dp[x][j - 1];
                }
            }
            for (int i = 1; i <= n; i++) {
                if (isP(s[i - 1])) {
                    continue;
                }
                int hi = i - minLength;
                if (hi >= 0) {
                    dp[i][j] = prefix[hi + 1] % MOD;
                }
            }
        }
        return (int)(dp[n][k] % MOD);
    }
};
