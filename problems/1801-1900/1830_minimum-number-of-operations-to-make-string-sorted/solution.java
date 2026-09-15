class Solution {

    // Each operation steps s to its previous lexicographic permutation, so
    // the operation count is the number of distinct permutations of the
    // multiset that are strictly smaller than s. That rank minus one splits
    // per position: with rem slots after i, any remaining letter smaller
    // than s[i] can lead them in rem! / prod(cnt!) arrangements — cnt of
    // the chosen letter one lower. Keeping den = prod(1/cnt!) incrementally
    // folds the multinomial into one multiply per step: the summed
    // contribution is fact[rem] * den * sum(smaller counts), and placing
    // s[i] itself multiplies den by its pre-placement count. Every residue
    // product stays below (10^9 + 7)^2 ~ 10^18, inside long range.
    public int makeStringSorted(String s) {
        final long mod = 1_000_000_007L;
        int n = s.length();
        long[] fact = new long[n + 1];
        fact[0] = 1;
        for (int i = 1; i <= n; i++) {
            fact[i] = (fact[i - 1] * i) % mod;
        }
        long[] invFact = new long[n + 1];
        invFact[n] = modPow(fact[n], mod - 2, mod);
        for (int i = n; i > 0; i--) {
            invFact[i - 1] = (invFact[i] * i) % mod;
        }
        int[] cnt = new int[26];
        for (int i = 0; i < n; i++) {
            cnt[s.charAt(i) - 'a']++;
        }
        long den = 1;
        for (int k = 0; k < 26; k++) {
            den = (den * invFact[cnt[k]]) % mod;
        }
        long ans = 0;
        for (int i = 0; i < n; i++) {
            int c = s.charAt(i) - 'a';
            int smaller = 0;
            for (int a = 0; a < c; a++) {
                smaller += cnt[a];
            }
            ans = (ans + ((fact[n - 1 - i] * den) % mod) * smaller) % mod;
            den = (den * cnt[c]) % mod;
            cnt[c]--;
        }
        return (int) ans;
    }

    private long modPow(long base, long exp, long mod) {
        long result = 1;
        base %= mod;
        while (exp > 0) {
            if ((exp & 1) == 1) {
                result = (result * base) % mod;
            }
            base = (base * base) % mod;
            exp >>= 1;
        }
        return result;
    }
}
