class Solution {
  public:
    int countAnagrams(string s) {
        // Product over words of the multinomial len!/prod(count!), all
        // reduced modulo 1e9+7; division becomes multiplication by the
        // Fermat inverse x^(p-2).
        static const long long kMod = 1'000'000'007LL;
        long long answer = 1;
        int start = 0;
        for (int i = 0; i <= (int)s.size(); ++i) {
            if (i == (int)s.size() || s[i] == ' ') {
                answer = answer * wordWays(s, start, i, kMod) % kMod;
                start = i + 1;
            }
        }
        return (int)answer;
    }

  private:
    static long long wordWays(const string &s, int from, int to, long long mod) {
        long long counts[26] = {};
        for (int i = from; i < to; ++i)
            ++counts[s[i] - 'a'];
        long long term = factorialMod(to - from, mod);
        for (long long count : counts) {
            if (count > 1) {
                term = term * modPow(factorialMod((int)count, mod), mod - 2, mod) % mod;
            }
        }
        return term;
    }

    static long long factorialMod(int n, long long mod) {
        long long result = 1;
        for (int i = 2; i <= n; ++i)
            result = result * i % mod;
        return result;
    }

    static long long modPow(long long base, long long exp, long long mod) {
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
