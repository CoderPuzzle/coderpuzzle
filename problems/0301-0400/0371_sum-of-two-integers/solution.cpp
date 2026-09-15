class Solution {
  public:
    int getSum(int a, int b) {
        // XOR is addition without the carries; AND marks every position
        // that produces a carry, and shifting it left one place lines the
        // carries up under the digits they inflate. Repeat until no carry
        // remains. The accumulation runs in unsigned 32-bit — the mask is
        // the type, wrapping every intermediate — and the final pattern is
        // reinterpreted as the signed answer.
        unsigned x = a, y = b;
        while (y != 0) {
            unsigned carry = (x & y) << 1;
            x = x ^ y;
            y = carry;
        }
        return static_cast<int>(x);
    }
};
