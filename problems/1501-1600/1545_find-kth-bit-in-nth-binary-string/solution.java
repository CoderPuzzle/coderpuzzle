class Solution {

    public String findKthBit(int n, int k) {
        // Peel levels off from n down to 1 instead of building S(n). At each
        // level, k either falls in the S(n-1) copy unchanged, lands exactly
        // on the inserted "1", or falls in the inverted mirror of S(n-1) —
        // in which case it maps back to a position in S(n-1) and the final
        // answer needs one more inversion.
        boolean invert = false;
        while (n > 1) {
            int half = 1 << (n - 1); // len(S(n-1)), and S(n)'s middle position
            if (k == half) {
                return invert ? "0" : "1";
            }
            if (k > half) {
                k = 2 * half - k;
                invert = !invert;
            }
            n--;
        }
        return invert ? "1" : "0";
    }
}
