impl Solution {
    // Swaps only happen between adjacent balls, and two balls of the
    // same color never need to cross, so the minimum number of swaps is
    // exactly the number of (1, 0) inversions: each 1 must pass every 0
    // sitting to its right. One right-to-left sweep counts them —
    // accumulate the zeros seen so far and add that to the answer at
    // every 1. The count can exceed 32 bits (a half split of 10^5 balls
    // gives 2.5 x 10^9), hence the 64-bit accumulator.
    pub fn minimum_steps(s: String) -> i64 {
        let bytes = s.as_bytes();
        let mut total: i64 = 0;
        let mut zeros: i64 = 0;
        for i in (0..bytes.len()).rev() {
            if bytes[i] == b'0' {
                zeros += 1;
            } else {
                total += zeros;
            }
        }
        total
    }
}
