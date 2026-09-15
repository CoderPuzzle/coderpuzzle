class Solution {
  public:
    int minNonZeroProduct(int p) {
        // Every integer in [1, 2^p - 1] pairs with its bitwise complement
        // 2^p - 1 - x: the two use exactly opposite bits, so swapping can push
        // all the 1s onto one of them and each pair collapses to (1, 2^p - 2)
        // with product 2^p - 2. The unpaired all-ones 2^p - 1 stays untouched
        // (reducing it would force a zero). With 2^(p-1) - 1 pairs the minimum
        // non-zero product is (2^p - 2)^(2^(p-1) - 1) * (2^p - 1), folded by
        // iterative square-and-multiply — p up to 60 costs ~60 squarings.
        const long long MOD = 1000000007LL;
        long long full = (1LL << p) - 1;
        long long base = full - 1;
        long long exp = (1LL << (p - 1)) - 1;
        return (int)(power(base, exp, MOD) * (full % MOD) % MOD);
    }

  private:
    long long power(long long base, long long exp, long long mod) {
        // Squares stay below (10^9+6)^2 ~ 10^18, safely inside long long.
        long long result = 1;
        long long b = base % mod;
        while (exp > 0) {
            if (exp & 1)
                result = result * b % mod;
            b = b * b % mod;
            exp >>= 1;
        }
        return result;
    }
};
