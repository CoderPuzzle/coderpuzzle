impl Solution {
    pub fn reverse_bits(n: i32) -> i32 {
        // Read the pattern as u32 so the shifts stay logical; each iteration
        // pushes the lowest bit onto the accumulator, bit i -> position 31 - i.
        let mut remaining = n as u32;
        let mut reversed: u32 = 0;
        for _ in 0..32 {
            reversed = (reversed << 1) | (remaining & 1);
            remaining >>= 1;
        }
        reversed as i32
    }
}
