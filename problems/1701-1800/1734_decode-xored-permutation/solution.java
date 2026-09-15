class Solution {

    public int[] decode(int[] encoded) {
        // The chain perm[i + 1] = perm[i] ^ encoded[i] unrolls the whole
        // permutation from perm[0], which the permutation premise pins:
        // total = 1 ^ ... ^ n is known in advance, and XOR-ing the
        // odd-index encoded entries telescopes to perm[1] ^ ... ^
        // perm[n - 1] — covering every element but perm[0] exactly
        // because n is odd — so perm[0] = total ^ that.
        int n = encoded.length + 1;
        int total = 0;
        for (int value = 1; value <= n; value++) {
            total ^= value;
        }
        int odd = 0;
        for (int i = 1; i < n - 1; i += 2) {
            odd ^= encoded[i];
        }
        int[] perm = new int[n];
        perm[0] = total ^ odd;
        for (int i = 0; i < encoded.length; i++) {
            perm[i + 1] = perm[i] ^ encoded[i];
        }
        return perm;
    }
}
