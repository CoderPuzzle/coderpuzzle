class Solution {
  public:
    int kInversePairs(int n, int k) {
        // dp[j] counts the arrangements of the numbers placed so far that
        // have exactly j inverse pairs; inserting the new maximum m into
        // any of its m slots adds between 0 and m-1 pairs, so row m at j
        // is the sliding-window sum of row m-1 over [j-m+1, j]. `window`
        // is int64_t: before its reduction it can reach 3 * MOD, past
        // 32-bit range.
        const int64_t MOD = 1'000'000'007;
        vector<int64_t> dp(k + 1, 0), next(k + 1, 0);
        dp[0] = 1;
        for (int m = 2; m <= n; ++m) {
            int64_t window = 0;
            for (int j = 0; j <= k; ++j) {
                window += dp[j];
                if (j >= m)
                    window += MOD - dp[j - m];
                window %= MOD;
                next[j] = window;
            }
            dp.swap(next);
        }
        return static_cast<int>(dp[k]);
    }
};
