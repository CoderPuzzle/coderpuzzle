class Solution {
  public:
    int distinctSequences(int n) {
        const long long MOD = 1000000007LL;
        if (n == 1)
            return 6;
        // dp[a][b] counts valid sequences ending in ..., a, b; the gap rule
        // looks back exactly two positions, so nothing older matters
        static long long dp[7][7], ndp[7][7];
        memset(dp, 0, sizeof(dp));
        // base: length-2 sequences, one per ordered coprime pair with a != b
        for (int a = 1; a <= 6; a++) {
            for (int b = 1; b <= 6; b++) {
                if (a != b && gcd(a, b) == 1)
                    dp[a][b] = 1;
            }
        }
        for (int len = 3; len <= n; len++) {
            memset(ndp, 0, sizeof(ndp));
            for (int a = 1; a <= 6; a++) {
                for (int b = 1; b <= 6; b++) {
                    long long cnt = dp[a][b];
                    // coprime pairs are sparse: skipping dead states prunes
                    // most of the 36-entry table
                    if (cnt == 0)
                        continue;
                    for (int c = 1; c <= 6; c++) {
                        // c != b: no adjacent equal (coprimality alone misses
                        // (1,1)); c != a: no repeat at distance 2 (gcd would
                        // not object when a = 1)
                        if (c != a && c != b && gcd(c, b) == 1) {
                            // ..., a, b, c ends in (b, c)
                            ndp[b][c] = (ndp[b][c] + cnt) % MOD;
                        }
                    }
                }
            }
            memcpy(dp, ndp, sizeof(dp));
        }
        // every entry is the ending of one full length-n sequence
        long long total = 0;
        for (int a = 1; a <= 6; a++) {
            for (int b = 1; b <= 6; b++)
                total = (total + dp[a][b]) % MOD;
        }
        return (int)total;
    }
};
