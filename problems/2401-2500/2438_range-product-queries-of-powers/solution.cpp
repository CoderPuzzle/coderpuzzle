class Solution {
  public:
    vector<int> productQueries(int n, vector<vector<int>> &queries) {
        // The minimum set of powers of two summing to n is exactly its set
        // bits (hint 1), so powers is the sorted list of 1 << b for each
        // set bit b. A range product of ascending powers of two is itself
        // a power of two — 2^(exponent sum) — but under the modulus the
        // clean tool is prefix products with one modular inverse per query
        // (Fermat, MOD prime): product(lo..hi) = pref[hi+1] * inv(pref[lo]).
        const long long MOD = 1'000'000'007;
        vector<long long> powers;
        for (int b = 0; b < 30; ++b)
            if (n >> b & 1)
                powers.push_back(1LL << b);
        vector<long long> pref(powers.size() + 1, 1);
        for (int i = 0; i < (int)powers.size(); ++i)
            pref[i + 1] = pref[i] * powers[i] % MOD;
        vector<int> answers(queries.size());
        for (int q = 0; q < (int)queries.size(); ++q) {
            int lo = queries[q][0], hi = queries[q][1];
            answers[q] = (int)(pref[hi + 1] * powMod(pref[lo], MOD - 2, MOD) % MOD);
        }
        return answers;
    }

  private:
    long long powMod(long long base, long long exp, long long mod) {
        long long result = 1;
        while (exp > 0) {
            if (exp & 1)
                result = result * base % mod;
            base = base * base % mod;
            exp >>= 1;
        }
        return result;
    }
};
