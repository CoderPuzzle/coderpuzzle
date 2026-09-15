impl Solution {
    pub fn find_number(common_bits: &mut CommonBits) -> i32 {
        // Query 0 first: it agrees wherever n is 0, counts every zero among
        // the low 30 bits, and leaves n untouched. For a single-bit probe
        // num = 2^i asked while n is whole, the answer is base + 1 when bit
        // i is set (probe agrees there too) and base - 1 when it is clear.
        // Every query flips that one bit of state, so each mask is asked
        // twice: XOR with the same num reverts the effect.
        let base = common_bits.common_bits(0);
        let mut n = 0;
        for i in 0..30 {
            if common_bits.common_bits(1 << i) > base {
                n |= 1 << i;
            }
            common_bits.common_bits(1 << i);
        }
        n
    }
}
