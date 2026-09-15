import java.util.Arrays;

class Solution {

    // After sorting, nums[i] is the maximum of exactly those subsequences
    // whose other members come from the i smaller entries: summed over
    // sizes 1..k that is g(i) = sum_{j < k} C(i, j) subsequences, and
    // symmetrically it is the minimum of g(n-1-i) of them (the larger
    // entries). So the answer is sum nums[i] * (g(i) + g(n-1-i))
    // mod 10^9 + 7. Each partial row sum rolls in O(1): Pascal gives
    // C(i, j) = C(i-1, j) + C(i-1, j-1), so g(i) = 2*g(i-1) - C(i-1, k-1),
    // one binomial per step from factorial tables. n <= 10^5 keeps those
    // tables small; every residue product stays below ~10^18, inside long.
    public int minMaxSums(int[] nums, int k) {
        long mod = 1_000_000_007L;
        int n = nums.length;
        Arrays.sort(nums);

        long[] fact = new long[n];
        fact[0] = 1;
        for (int i = 1; i < n; i++) {
            fact[i] = (fact[i - 1] * i) % mod;
        }
        long[] invFact = new long[n];
        invFact[n - 1] = modPow(fact[n - 1], mod - 2, mod);
        for (int i = n - 1; i > 0; i--) {
            invFact[i - 1] = (invFact[i] * i) % mod;
        }

        long[] g = new long[n];
        g[0] = 1;
        for (int i = 1; i < n; i++) {
            g[i] = (((2 * g[i - 1]) % mod) + mod - choose(fact, invFact, i - 1, k - 1, mod)) % mod;
        }
        long total = 0;
        for (int i = 0; i < n; i++) {
            total = (total + (nums[i] % mod) * ((g[i] + g[n - 1 - i]) % mod)) % mod;
        }
        return (int) total;
    }

    private static long choose(long[] fact, long[] invFact, int a, int b, long mod) {
        if (b < 0 || b > a) {
            return 0;
        }
        return (((fact[a] * invFact[b]) % mod) * invFact[a - b]) % mod;
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
