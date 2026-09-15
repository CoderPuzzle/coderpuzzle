class Solution {
  public:
    int numOfArrays(int n, int m, int k) {
        const long long MOD = 1000000007;
        if (k <= 0 || k > n || k > m) {
            return 0;
        }
        vector<vector<long long>> dp(k + 1, vector<long long>(m + 1, 0));
        for (int j = 1; j <= m; j++) {
            dp[1][j] = 1;
        }
        for (int step = 2; step <= n; step++) {
            vector<vector<long long>> ndp(k + 1, vector<long long>(m + 1, 0));
            for (int c = 1; c <= k; c++) {
                const vector<long long> &prev = dp[c - 1];
                vector<long long> pref(m + 1, 0);
                for (int j = 1; j <= m; j++) {
                    pref[j] = (pref[j - 1] + prev[j]) % MOD;
                }
                const vector<long long> &cur = dp[c];
                vector<long long> &row = ndp[c];
                for (int j = 1; j <= m; j++) {
                    row[j] = (cur[j] * j + pref[j - 1]) % MOD;
                }
            }
            dp = move(ndp);
        }
        long long total = 0;
        for (int j = 1; j <= m; j++) {
            total = (total + dp[k][j]) % MOD;
        }
        return (int)total;
    }
};
