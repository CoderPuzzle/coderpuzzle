class Solution {

    public int sumOfBlocks(int n) {
        // Build the blocks in order from one shared counter: block i
        // multiplies the next i consecutive integers into a product that
        // is reduced modulo 10^9 + 7 after every factor, then folds it
        // into the running total. F(n) combines the blocks using only
        // multiplication and addition, so residue arithmetic reproduces
        // F(n) mod 10^9 + 7 exactly while the exact products are never
        // materialized.
        final long MOD = 1_000_000_007L;
        long total = 0;
        long cur = 1;
        for (int i = 1; i <= n; i++) {
            long prod = 1;
            for (int j = 0; j < i; j++) {
                prod = (prod * cur) % MOD;
                cur++;
            }
            total = (total + prod) % MOD;
        }
        return (int) total;
    }
}
