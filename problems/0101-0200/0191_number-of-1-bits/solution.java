class Solution {

    public int hammingWeight(long n) {
        // Subtracting one borrows through the trailing zeros and flips the
        // lowest set bit off, so n & (n - 1) clears exactly that bit: the
        // loop runs once per set bit, never touching the zero bits above it.
        // The parameter is a long so every 32-bit pattern, up to 2^32 - 1,
        // reaches the loop as a positive number.
        int count = 0;
        while (n != 0) {
            n &= n - 1;
            ++count;
        }
        return count;
    }
}
