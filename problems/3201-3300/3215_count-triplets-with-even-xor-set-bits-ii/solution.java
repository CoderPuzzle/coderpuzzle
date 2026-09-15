class Solution {

    public long tripletCount(int[] a, int[] b, int[] c) {
        // A triplet's XOR has an even number of set bits exactly when an
        // even number of the three operands carries an odd popcount: every
        // bit position of the XOR holds the mod-2 sum of the operands'
        // bits there, so the XOR preserves the parity of the total
        // set-bit count. Counting the even- and odd-parity elements of
        // each array leaves four parity classes, and the answer sums the
        // three products that pick zero or two odd parities.
        int[][] arrays = { a, b, c };
        long[] even = new long[3];
        long[] odd = new long[3];
        for (int i = 0; i < 3; i++) {
            for (int x : arrays[i]) {
                if (Integer.bitCount(x) % 2 == 0) {
                    even[i]++;
                } else {
                    odd[i]++;
                }
            }
        }
        return (
            even[0] * even[1] * even[2] +
            odd[0] * odd[1] * even[2] +
            odd[0] * even[1] * odd[2] +
            even[0] * odd[1] * odd[2]
        );
    }
}
