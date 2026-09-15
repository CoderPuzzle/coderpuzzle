class Solution {
  public:
    int numberOfSequence(int n, vector<int> &sick) {
        // The initially infected people split the line into blocks of
        // uninfected people. An edge block (touching index 0 or n - 1) has
        // only one infectable person per step, so its internal order is
        // forced; an interior block (sick people on both sides) may shed
        // from either endpoint, giving 2^(len - 1) internal orders. Blocks
        // shed independently, so the answer is the multinomial count of
        // ways to interleave the per-step picks across blocks,
        // S! / prod len_i!, times each interior block's 2^(len - 1), all
        // mod 10^9 + 7. n <= 10^5 keeps the factorial tables small; every
        // residue product stays below ~10^18, inside long long.
        const long long MOD = 1000000007LL;
        vector<long long> fact(n + 1, 1), invFact(n + 1, 1), pow2(n + 1, 1);
        for (int i = 1; i <= n; i++) {
            fact[i] = fact[i - 1] * i % MOD;
            pow2[i] = pow2[i - 1] * 2 % MOD;
        }
        long long base = fact[n], result = 1, expo = MOD - 2;
        while (expo > 0) {
            if (expo & 1)
                result = result * base % MOD;
            base = base * base % MOD;
            expo >>= 1;
        }
        invFact[n] = result;
        for (int i = n; i > 0; i--)
            invFact[i - 1] = invFact[i] * i % MOD;

        long long ans = fact[n - (int)sick.size()];
        if (sick[0] > 0)
            ans = ans * invFact[sick[0]] % MOD;
        for (int i = 1; i < (int)sick.size(); i++) {
            long long gap = (long long)sick[i] - sick[i - 1] - 1;
            if (gap > 0)
                ans = ans * invFact[gap] % MOD * pow2[gap - 1] % MOD;
        }
        if (sick.back() < n - 1)
            ans = ans * invFact[n - 1 - sick.back()] % MOD;
        return (int)ans;
    }
};
