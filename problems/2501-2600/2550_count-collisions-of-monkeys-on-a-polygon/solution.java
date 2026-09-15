class Solution {

    public int monkeyMove(int n) {
        // Complement counting: only the two unanimous rotations avoid
        // all collisions, so the answer is (2^n - 2) mod 1e9+7 by
        // iterative binary exponentiation; longs absorb the ~10^18
        // intermediate products safely.
        final long mod = 1_000_000_007L;
        long result = 1;
        long base = 2 % mod;
        for (long e = n; e > 0; e >>= 1) {
            if ((e & 1) == 1) {
                result = (result * base) % mod;
            }
            base = (base * base) % mod;
        }
        return (int) ((result - 2 + mod) % mod);
    }
}
