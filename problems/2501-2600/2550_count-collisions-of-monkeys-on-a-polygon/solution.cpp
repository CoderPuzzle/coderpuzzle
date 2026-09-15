class Solution {
  public:
    int monkeyMove(int n) {
        // Complement counting: only the two unanimous rotations avoid
        // all collisions, so the answer is (2^n - 2) mod 1e9+7 by
        // iterative binary exponentiation; long longs absorb the
        // ~10^18 intermediate products safely.
        const long long MOD = 1000000007LL;
        long long result = 1;
        long long base = 2 % MOD;
        for (long long e = n; e > 0; e >>= 1) {
            if (e & 1)
                result = result * base % MOD;
            base = base * base % MOD;
        }
        return (int)((result - 2 + MOD) % MOD);
    }
};
