class Solution {
  public:
    int goodBinaryStrings(int minLength, int maxLength, int oneGroup, int zeroGroup) {
        // dp[i] counts good strings of length i: peel off the final run of
        // equal characters — its size is a positive multiple of oneGroup or
        // zeroGroup, and what remains is any shorter good string (or nothing).
        const long long MOD = 1'000'000'007LL;
        vector<long long> dp(maxLength + 1, 0);
        dp[0] = 1;
        for (int i = 1; i <= maxLength; i++) {
            long long v = 0;
            if (i >= oneGroup)
                v += dp[i - oneGroup];
            if (i >= zeroGroup)
                v += dp[i - zeroGroup];
            dp[i] = v % MOD;
        }
        long long total = 0;
        for (int i = minLength; i <= maxLength; i++)
            total += dp[i];
        return (int)(total % MOD);
    }
};
