class Solution {

    public int reverseBits(int n) {
        // Bit i of n must land at position 31 - i: shift the accumulator
        // left, OR in n's lowest bit, then drop that bit. >>> is the unsigned
        // shift, so sign bits never smear into the read position.
        int reversed = 0;
        for (int i = 0; i < 32; ++i) {
            reversed = (reversed << 1) | (n & 1);
            n >>>= 1;
        }
        return reversed;
    }
}
