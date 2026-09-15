class Solution {
  public:
    long long sumScores(string s) {
        int n = (int)s.size();
        if (n == 0)
            return 0;
        vector<long long> a(n);
        for (int i = 0; i < n; i++)
            a[i] = s[i] - 'a';
        const long long MOD1 = 1000000007LL;
        const long long MOD2 = 1000000009LL;
        const long long BASE = 26;

        // Prefix hashes under two independent moduli plus base powers, so any
        // question "does the suffix at i agree with the prefix for L chars?" is
        // answered from three table reads.
        vector<long long> pow1(n + 1, 1), pow2(n + 1, 1);
        vector<long long> pre1(n + 1, 0), pre2(n + 1, 0);
        for (int i = 1; i <= n; i++) {
            pow1[i] = pow1[i - 1] * BASE % MOD1;
            pow2[i] = pow2[i - 1] * BASE % MOD2;
            pre1[i] = (pre1[i - 1] * BASE + a[i - 1]) % MOD1;
            pre2[i] = (pre2[i - 1] * BASE + a[i - 1]) % MOD2;
        }

        // The prefix's own hash is pre[L]; the suffix-at-i window's hash is
        // pre[i+L] - pre[i] * BASE^L, normalized. Agreement under both moduli
        // accepts the length; a coincidental double match is a collision,
        // roughly one chance in 10^18 per probe.
        auto agrees = [&](int i, int len) {
            long long h1 = ((pre1[i + len] - pre1[i] * pow1[len]) % MOD1 + MOD1) % MOD1;
            long long h2 = ((pre2[i + len] - pre2[i] * pow2[len]) % MOD2 + MOD2) % MOD2;
            return h1 == pre1[len] && h2 == pre2[len];
        };

        // Agreement for L characters implies agreement at every shorter length,
        // so the predicate is prefix-monotone: binary-search each suffix's
        // longest common prefix with s. s itself scores n.
        long long total = n;
        for (int i = 1; i < n; i++) {
            int lo = 0, hi = n - i;
            while (lo < hi) {
                int mid = (lo + hi + 1) / 2;
                if (agrees(i, mid))
                    lo = mid;
                else
                    hi = mid - 1;
            }
            total += lo;
        }
        return total;
    }
};
