class Solution {

    public int[] evenOddBit(int n) {
        // Peel the binary representation one bit at a time from the
        // right; the peel counter doubles as the bit index, whose parity
        // routes each set bit into the even or the odd bucket.
        int[] counts = new int[2];
        int pos = 0;
        while (n > 0) {
            if ((n & 1) == 1) {
                counts[pos % 2]++;
            }
            n >>= 1;
            ++pos;
        }
        return counts;
    }
}
