class Solution {
  public:
    int findGoodStrings(int n, string s1, string s2, string evil) {
        const long long MOD = 1000000007LL;
        int m = (int)evil.size();
        vector<int> fail(m, 0);
        int k = 0;
        for (int i = 1; i < m; i++) {
            while (k > 0 && evil[i] != evil[k]) {
                k = fail[k - 1];
            }
            if (evil[i] == evil[k]) {
                k += 1;
            }
            fail[i] = k;
        }

        // dp[pos][state][lo][hi]
        vector<vector<array<array<long long, 2>, 2>>> dp(n + 1, vector<array<array<long long, 2>, 2>>(m + 1));
        for (int st = 0; st <= m; st++) {
            for (int lo = 0; lo <= 1; lo++) {
                for (int hi = 0; hi <= 1; hi++) {
                    dp[n][st][lo][hi] = (st == m) ? 0 : 1;
                }
            }
        }
        for (int pos = n - 1; pos >= 0; pos--) {
            for (int state = 0; state <= m; state++) {
                if (state == m) {
                    for (int lo = 0; lo <= 1; lo++) {
                        for (int hi = 0; hi <= 1; hi++) {
                            dp[pos][state][lo][hi] = 0;
                        }
                    }
                    continue;
                }
                int lowBase = s1[pos];
                int highBase = s2[pos];
                for (int lo = 0; lo <= 1; lo++) {
                    for (int hi = 0; hi <= 1; hi++) {
                        int lowC = (lo == 1) ? lowBase : 'a';
                        int highC = (hi == 1) ? highBase : 'z';
                        long long total = 0;
                        for (int code = lowC; code <= highC; code++) {
                            int st2 = state;
                            while (st2 > 0 && evil[st2] != (char)code) {
                                st2 = fail[st2 - 1];
                            }
                            if (evil[st2] == (char)code) {
                                st2 += 1;
                            }
                            if (st2 == m)
                                continue;
                            int nlo = (lo == 1 && code == lowBase) ? 1 : 0;
                            int nhi = (hi == 1 && code == highBase) ? 1 : 0;
                            total += dp[pos + 1][st2][nlo][nhi];
                        }
                        dp[pos][state][lo][hi] = total % MOD;
                    }
                }
            }
        }
        return (int)(dp[0][0][1][1] % MOD);
    }
};
