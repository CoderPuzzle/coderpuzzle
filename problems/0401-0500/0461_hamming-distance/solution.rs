impl Solution {
    pub fn hamming_distance(x: i32, y: i32) -> i32 {
        // XOR writes a 1 exactly at the positions where x and y differ
        // and a 0 wherever they agree, so the distance is the number of
        // set bits in the pattern. Count them by testing the lowest bit
        // and shifting right until the pattern empties. Inputs are at
        // most 2^31 - 1, so the pattern is non-negative, fits an i32
        // exactly, and the shift never touches a sign bit.
        let mut z = x ^ y;
        let mut distance = 0;
        while z != 0 {
            distance += z & 1;
            z >>= 1;
        }
        distance
    }
}
