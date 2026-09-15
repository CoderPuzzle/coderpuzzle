#include <string>
#include <vector>

class Solution {
    static constexpr long long kMod = 1'000'000'007LL;

  public:
    int countGoodSubsequences(std::string s) {
        // A good subsequence is generated exactly once by its shared
        // frequency m: each letter either sits out or contributes
        // C(count, m) index choices, so every per-m product counts one
        // term of the answer - plus the all-absent pick that surfaces in
        // every product and is dropped once per term. Factorial tables
        // modulo 1e9+7, division via Fermat inverses.
        std::vector<int> counts(26, 0);
        for (char ch : s)
            ++counts[ch - 'a'];
        std::vector<int> present;
        int top = 0;
        for (int c : counts) {
            if (c > top)
                top = c;
            if (c > 0)
                present.push_back(c);
        }
        std::vector<long long> fact(top + 1, 1), invFact(top + 1, 1);
        for (int i = 2; i <= top; ++i) {
            fact[i] = fact[i - 1] * i % kMod;
        }
        invFact[top] = modPow(fact[top], kMod - 2);
        for (int i = top; i > 0; --i) {
            invFact[i - 1] = invFact[i] * i % kMod;
        }
        long long total = 0;
        for (int m = 1; m <= top; ++m) {
            long long prod = 1;
            for (int count : present) {
                prod = prod * (comb(count, m, fact, invFact) + 1) % kMod;
            }
            total += prod - 1;
        }
        return (int)(total % kMod);
    }

  private:
    static long long comb(int n, int k, const std::vector<long long> &fact, const std::vector<long long> &invFact) {
        if (k > n)
            return 0;
        return fact[n] * invFact[k] % kMod * invFact[n - k] % kMod;
    }

    static long long modPow(long long base, long long exp) {
        long long result = 1;
        base %= kMod;
        while (exp > 0) {
            if (exp & 1)
                result = result * base % kMod;
            base = base * base % kMod;
            exp >>= 1;
        }
        return result;
    }
};
