class Solution {
  public:
    // Each operation steps s to its previous lexicographic permutation, so
    // the operation count is the number of distinct permutations of the
    // multiset that are strictly smaller than s. That rank minus one splits
    // per position: with rem slots after i, any remaining letter smaller
    // than s[i] can lead them in rem! / prod(cnt!) arrangements — cnt of
    // the chosen letter one lower. Keeping den = prod(1/cnt!) incrementally
    // folds the multinomial into one multiply per step: the summed
    // contribution is fact[rem] * den * sum(smaller counts), and placing
    // s[i] itself multiplies den by its pre-placement count. Every residue
    // product stays below (10^9 + 7)^2 ~ 10^18, inside long long range.
    int makeStringSorted(string s) {
        const long long MOD = 1'000'000'007LL;
        int n = (int)s.size();
        vector<long long> fact(n + 1);
        fact[0] = 1;
        for (int i = 1; i <= n; i++)
            fact[i] = fact[i - 1] * i % MOD;
        vector<long long> inv_fact(n + 1);
        inv_fact[n] = modPow(fact[n], MOD - 2, MOD);
        for (int i = n; i > 0; i--)
            inv_fact[i - 1] = inv_fact[i] * i % MOD;
        int cnt[26] = {0};
        for (char ch : s)
            cnt[ch - 'a']++;
        long long den = 1;
        for (int k = 0; k < 26; k++)
            den = den * inv_fact[cnt[k]] % MOD;
        long long ans = 0;
        for (int i = 0; i < n; i++) {
            int c = s[i] - 'a';
            int smaller = 0;
            for (int a = 0; a < c; a++)
                smaller += cnt[a];
            ans = (ans + fact[n - 1 - i] * den % MOD * smaller) % MOD;
            den = den * cnt[c] % MOD;
            cnt[c]--;
        }
        return (int)ans;
    }

  private:
    long long modPow(long long base, long long exp, long long mod) {
        long long result = 1;
        base %= mod;
        while (exp > 0) {
            if (exp & 1)
                result = result * base % mod;
            base = base * base % mod;
            exp >>= 1;
        }
        return result;
    }
};
