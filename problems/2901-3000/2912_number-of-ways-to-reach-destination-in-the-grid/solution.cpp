class Solution {
  public:
    int numberOfWays(int n, int m, int k, vector<int> &source, vector<int> &dest) {
        const long long MOD = 1'000'000'007LL;
        // line_counts: walks of t steps (each step to a different position
        // on a line of `size` cells) ending at target vs anywhere else. A
        // step into target can come from any other position; a step
        // elsewhere has size - 1 options from target and size - 2 from any
        // other position.
        auto lineCounts = [&](long long size, int start, int target) {
            vector<long long> a(k + 1), b(k + 1);
            a[0] = start == target ? 1 : 0;
            b[0] = 1 - a[0];
            long long offByOne = (size - 1) % MOD;
            long long offByTwo = (size - 2) % MOD;
            for (int t = 0; t < k; ++t) {
                a[t + 1] = b[t];
                b[t + 1] = (a[t] * offByOne + b[t] * offByTwo) % MOD;
            }
            return a;
        };
        vector<long long> ax = lineCounts(n, source[0], dest[0]);
        vector<long long> ay = lineCounts(m, source[1], dest[1]);
        // Factorials for choosing which of the k moves change x.
        vector<long long> fact(k + 1), invFact(k + 1);
        fact[0] = 1;
        for (int i = 1; i <= k; ++i)
            fact[i] = fact[i - 1] * i % MOD;
        auto power = [&](long long base, long long exp) {
            long long result = 1;
            while (exp > 0) {
                if (exp & 1)
                    result = result * base % MOD;
                base = base * base % MOD;
                exp >>= 1;
            }
            return result;
        };
        invFact[k] = power(fact[k], MOD - 2);
        for (int i = k; i >= 1; --i)
            invFact[i - 1] = invFact[i] * i % MOD;
        // A move keeps one coordinate fixed, so x and y evolve
        // independently: with i of the k moves changing x, the x-walk has i
        // steps, the y-walk k - i steps, and their interleavings number
        // C(k, i).
        long long ans = 0;
        for (int i = 0; i <= k; ++i) {
            long long comb = fact[k] * invFact[i] % MOD * invFact[k - i] % MOD;
            ans = (ans + comb * ax[i] % MOD * ay[k - i]) % MOD;
        }
        return (int)ans;
    }
};
