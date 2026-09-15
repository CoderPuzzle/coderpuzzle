impl Solution {
    pub fn get_sum(mut a: i32, mut b: i32) -> i32 {
        // XOR is addition without the carries; AND marks every position
        // that produces a carry, and shifting it left one place lines the
        // carries up under the digits they inflate. Repeat until no carry
        // remains. An i32 already is 32-bit two's complement, so the mask
        // is implicit in every operation and negative operands wrap
        // exactly as they should.
        while b != 0 {
            let carry = (a & b) << 1;
            a ^= b;
            b = carry;
        }
        a
    }
}
