class Solution {
  public:
    int numTilings(int n) {
        const int MOD = 1'000'000'007;
        if (n == 1)
            return 1;
        if (n == 2)
            return 2;
        long long a = 1, b = 1, c = 2; // f(0), f(1), f(2)
        for (int i = 3; i <= n; i++) {
            long long next = (2 * c + a) % MOD;
            a = b;
            b = c;
            c = next;
        }
        return (int)c;
    }
};
