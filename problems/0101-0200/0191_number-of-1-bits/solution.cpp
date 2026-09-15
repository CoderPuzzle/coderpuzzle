class Solution {
  public:
    int hammingWeight(long long n) {
        // Subtracting one borrows through the trailing zeros and flips the
        // lowest set bit off, so n & (n - 1) clears exactly that bit: the
        // loop runs once per set bit, never touching the zero bits above it.
        // long long keeps every pattern up to 2^32 - 1 positive and in range.
        int count = 0;
        while (n != 0) {
            n &= n - 1;
            ++count;
        }
        return count;
    }
};
