class Solution {

    public long nthSmallest(long n, int k) {
        // Numbers with exactly k one bits and bit length exactly L are
        // C(L-1, k-1): a leading 1 plus k-1 ones among L-1 free slots, so
        // hockey-sticking over shorter lengths, C(L, k) candidates have
        // length <= L. Grow L until rank n fits, then unrank the rest
        // MSB -> LSB: placing 0 at position p leaves C(p, need) smaller
        // completions, so set the bit whenever the leftover rank exceeds
        // that block. Every binomial tops out at C(50, 25) ~ 1.26e14 and
        // the answer below 2^50 -- long arithmetic and 1L shifts carry
        // both, since 2^50 overflows int well before it overflows long.
        long[][] C = new long[51][51];
        for (int i = 0; i <= 50; i++) {
            C[i][0] = 1;
            for (int j = 1; j <= i; j++) {
                C[i][j] = C[i - 1][j - 1] + C[i - 1][j];
            }
        }
        int length = k;
        while (C[length][k] < n) {
            length++;
        }
        long r = n - C[length - 1][k];
        long ans = 1L << (length - 1);
        int need = k - 1;
        for (int p = length - 2; p >= 0; p--) {
            if (r > C[p][need]) {
                r -= C[p][need];
                ans |= 1L << p;
                need--;
            }
        }
        return ans;
    }
}
