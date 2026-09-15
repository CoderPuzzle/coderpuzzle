class Solution {
  public:
    int findDerangement(int n) {
        // Element 1 lands at some position i != 1 (n - 1 ways); either i's
        // element takes 1's slot (D(n - 2) ways) or it does not (D(n - 1)
        // ways), so D(n) = (n - 1) * (D(n - 1) + D(n - 2)). Both running
        // values stay under the modulus, but their sum times (i - 1)
        // reaches ~2e15, so the pair lives in long longs.
        const long long MOD = 1'000'000'007LL;
        long long prev = 1, cur = 0; // D(0), D(1)
        for (int i = 2; i <= n; ++i) {
            long long next = (i - 1) * (cur + prev) % MOD;
            prev = cur;
            cur = next;
        }
        return (int)cur;
    }
};
