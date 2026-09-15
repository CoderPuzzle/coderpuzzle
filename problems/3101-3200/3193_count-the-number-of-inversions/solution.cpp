class Solution {
  public:
    int numberOfPermutations(int n, vector<vector<int>> &requirements) {
        const long long MOD = 1000000007LL;
        // req[end] = required inversion count (last entry wins on duplicates).
        vector<long long> reqMap(n, -1);
        int maxCnt = 0;
        for (auto &r : requirements) {
            reqMap[r[0]] = r[1];
            maxCnt = max(maxCnt, r[1]);
        }

        // dp[j] = number of permutations of length i with j inversions.
        // Growing length i -> i+1 adds between 0 and i new inversions.
        vector<long long> dp(maxCnt + 1, 0), ndp(maxCnt + 1, 0), prefix(maxCnt + 2, 0);
        dp[0] = 1;
        for (int i = 1; i <= n; i++) {
            if (i > 1) {
                long long s = 0;
                for (int j = 0; j <= maxCnt; j++) {
                    s = (s + dp[j]) % MOD;
                    prefix[j + 1] = s;
                }
                for (int j = 0; j <= maxCnt; j++) {
                    int lo = max(0, j - (i - 1));
                    ndp[j] = (prefix[j + 1] - prefix[lo] + MOD) % MOD;
                }
                swap(dp, ndp);
            }
            if (i - 1 < n && reqMap[i - 1] >= 0) {
                int c = (int)reqMap[i - 1];
                for (int j = 0; j <= maxCnt; j++) {
                    if (j != c)
                        dp[j] = 0;
                }
            }
        }
        return (int)(dp[reqMap[n - 1]] % MOD);
    }
};
