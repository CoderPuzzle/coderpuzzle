class Solution {
  public:
    int countVisiblePeople(int n, int pos, int k) {
        // The number seen is (# left people choosing 'L') + (# right people
        // choosing 'R'), so Vandermonde's identity collapses the split sum
        // to 2 * C(n - 1, k). Modular products fit long long, the answer is
        // an int.
        const long long MOD = 1000000007LL;
        if (k > n - 1) {
            return 0;
        }
        int size = n - 1;
        vector<long long> fact(size + 1), invFact(size + 1);
        fact[0] = 1;
        for (int i = 1; i <= size; i++) {
            fact[i] = fact[i - 1] * i % MOD;
        }
        invFact[size] = modPow(fact[size], MOD - 2, MOD);
        for (int i = size; i > 0; i--) {
            invFact[i - 1] = invFact[i] * i % MOD;
        }
        long long comb = fact[n - 1] * invFact[k] % MOD * invFact[n - 1 - k] % MOD;
        return (int)(2 * comb % MOD);
    }

  private:
    // Fermat inverse via binary exponentiation, all products inside long long.
    long long modPow(long long base, long long exp, long long mod) {
        long long result = 1;
        base %= mod;
        while (exp > 0) {
            if (exp & 1) {
                result = result * base % mod;
            }
            base = base * base % mod;
            exp >>= 1;
        }
        return result;
    }
};
