class Solution {
  public:
    int numOfWays(int n) {
        const long long MOD = 1'000'000'007LL;
        long long a = 6, b = 6;
        for (int i = 1; i < n; i++) {
            long long nextA = (3 * a + 2 * b) % MOD;
            long long nextB = (2 * a + 2 * b) % MOD;
            a = nextA;
            b = nextB;
        }
        return (int)((a + b) % MOD);
    }
};
