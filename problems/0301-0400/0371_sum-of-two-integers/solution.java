class Solution {

    public int getSum(int a, int b) {
        // XOR is addition without the carries; AND marks every position
        // that produces a carry, and shifting it left one place lines the
        // carries up under the digits they inflate. Repeat until no carry
        // remains. An int already is 32-bit two's complement, so the mask
        // is implicit in every operation and negative operands wrap
        // exactly as they should, with no final sign fix-up needed.
        while (b != 0) {
            int carry = (a & b) << 1;
            a = a ^ b;
            b = carry;
        }
        return a;
    }
}
