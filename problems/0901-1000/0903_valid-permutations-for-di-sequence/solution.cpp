class Solution {
  public:
    int numPermsDISequence(string s) {
        // dp[i][j] counts ways to fill the first i+1 positions, valid so
        // far, with position i holding the j-th smallest value placed.
        // Appending a value of new rank j shifts older ranks >= j up one,
        // so an 'I' step admits exactly the old ranks below j and a 'D'
        // step the old ranks j and above — both are prefix sums of the
        // previous row: P[j] for 'I', P[m] - P[j] for 'D'. One rolling
        // row carries the table; the answer is sum dp[n][*].
        constexpr long long MOD = 1'000'000'007;
        vector<long long> dp{1};
        for (char ch : s) {
            int m = dp.size();
            vector<long long> prefix(m + 1);
            for (int j = 0; j < m; ++j) {
                prefix[j + 1] = (prefix[j] + dp[j]) % MOD;
            }
            if (ch == 'I') {
                dp = move(prefix);
            } else {
                vector<long long> next(m + 1);
                for (int j = 0; j <= m; ++j) {
                    next[j] = (prefix[m] - prefix[j] + MOD) % MOD;
                }
                dp = move(next);
            }
        }
        long long total = 0;
        for (long long v : dp) {
            total += v;
        }
        return total % MOD;
    }
};
