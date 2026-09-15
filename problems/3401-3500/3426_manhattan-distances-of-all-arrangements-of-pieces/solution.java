class Solution {

    // Fix an unordered pair of cells: both carry a piece in exactly
    // C(m*n - 2, k - 2) arrangements (place the remaining k - 2 pieces
    // anywhere else), so the answer is (pairwise distance sum over all cell
    // pairs) * C(m*n - 2, k - 2) mod 10^9 + 7. By axis separation, rows d
    // apart pair with n columns on each side, so the board sum is
    // n^2 * T(m) + m^2 * T(n) with T(M) = M * (M - 1) * (M + 1) / 6 --
    // three consecutive integers, so the division is exact. M <= 10^5
    // keeps M^3 <= 10^15 and every residue product below ~10^18, all inside
    // long; n * n alone would overflow int, so it widens first.
    public int distanceSum(int m, int n, int k) {
        long mod = 1_000_000_007L;
        int total = m * n;

        long[] fact = new long[total + 1];
        fact[0] = 1;
        for (int i = 1; i <= total; i++) {
            fact[i] = (fact[i - 1] * i) % mod;
        }
        long[] invFact = new long[total + 1];
        invFact[total] = modPow(fact[total], mod - 2, mod);
        for (int i = total; i > 0; i--) {
            invFact[i - 1] = (invFact[i] * i) % mod;
        }

        long pairs = ((((long) n * n) % mod) * tri(m) + (((long) m * m) % mod) * tri(n)) % mod;
        long choose = (((fact[total - 2] * invFact[k - 2]) % mod) * invFact[total - k]) % mod;
        return (int) ((pairs * choose) % mod);
    }

    private static long tri(long dim) {
        return ((dim * (dim - 1) * (dim + 1)) / 6) % 1_000_000_007L;
    }

    private static long modPow(long base, long exp, long mod) {
        long result = 1;
        long b = base % mod;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                result = (result * b) % mod;
            }
            b = (b * b) % mod;
            exp >>= 1;
        }
        return result;
    }
}
