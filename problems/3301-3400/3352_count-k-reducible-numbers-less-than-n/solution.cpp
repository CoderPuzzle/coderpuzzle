class Solution {
  public:
    int countKReducibleNumbers(string s, int k) {
        const long long MOD = 1000000007;
        int L = (int)s.size();
        // f[x] = number of operations to reduce x to 1.
        vector<int> f(L + 1, 0);
        for (int x = 2; x <= L; x++) {
            f[x] = 1 + f[__builtin_popcount((unsigned)x)];
        }
        // Pascal's triangle mod MOD.
        vector<vector<long long>> C(L + 1, vector<long long>(L + 1, 0));
        for (int i = 0; i <= L; i++) {
            C[i][0] = 1;
            for (int j = 1; j <= i; j++) {
                C[i][j] = (C[i - 1][j - 1] + C[i - 1][j]) % MOD;
            }
        }
        // cnt[p] = number of integers x in [0, n-1] with popcount(x) == p.
        vector<long long> cnt(L + 1, 0);
        int ones = 0;
        for (int i = 0; i < L; i++) {
            if (s[i] == '1') {
                int remaining = L - i - 1;
                for (int p = 0; p <= remaining; p++) {
                    cnt[ones + p] = (cnt[ones + p] + C[remaining][p]) % MOD;
                }
                ones++;
            }
        }
        long long ans = 0;
        for (int p = 1; p <= L; p++) {
            if (1 + f[p] <= k) {
                ans = (ans + cnt[p]) % MOD;
            }
        }
        return (int)ans;
    }
};
