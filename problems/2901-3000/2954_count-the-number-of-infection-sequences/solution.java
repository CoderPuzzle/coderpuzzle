class Solution {

    public int numberOfSequence(int n, int[] sick) {
        // The initially infected people split the line into blocks of
        // uninfected people. An edge block (touching index 0 or n - 1) has
        // only one infectable person per step, so its internal order is
        // forced; an interior block (sick people on both sides) may shed
        // from either endpoint, giving 2^(len - 1) internal orders. Blocks
        // shed independently, so the answer is the multinomial count of
        // ways to interleave the per-step picks across blocks,
        // S! / prod len_i!, times each interior block's 2^(len - 1), all
        // mod 10^9 + 7. n <= 10^5 keeps the factorial tables small; every
        // residue product stays below ~10^18, inside long.
        final long mod = 1000000007L;
        long[] fact = new long[n + 1];
        long[] invFact = new long[n + 1];
        long[] pow2 = new long[n + 1];
        fact[0] = 1;
        pow2[0] = 1;
        for (int i = 1; i <= n; i++) {
            fact[i] = (fact[i - 1] * i) % mod;
            pow2[i] = (pow2[i - 1] * 2) % mod;
        }
        long base = fact[n];
        long result = 1;
        long expo = mod - 2;
        while (expo > 0) {
            if ((expo & 1) == 1) {
                result = (result * base) % mod;
            }
            base = (base * base) % mod;
            expo >>= 1;
        }
        invFact[n] = result;
        for (int i = n; i > 0; i--) {
            invFact[i - 1] = (invFact[i] * i) % mod;
        }

        long ans = fact[n - sick.length];
        if (sick[0] > 0) {
            ans = (ans * invFact[sick[0]]) % mod;
        }
        for (int i = 1; i < sick.length; i++) {
            int gap = sick[i] - sick[i - 1] - 1;
            if (gap > 0) {
                ans = (((ans * invFact[gap]) % mod) * pow2[gap - 1]) % mod;
            }
        }
        if (sick[sick.length - 1] < n - 1) {
            ans = (ans * invFact[n - 1 - sick[sick.length - 1]]) % mod;
        }
        return (int) ans;
    }
}
