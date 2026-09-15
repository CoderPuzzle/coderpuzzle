impl Solution {
    pub fn hamming_weight(n: i64) -> i32 {
        // Subtracting one borrows through the trailing zeros and flips the
        // lowest set bit off, so n & (n - 1) clears exactly that bit: the
        // loop runs once per set bit, never touching the zero bits above it.
        // Every pattern up to 2^32 - 1 is a positive i64, so the arithmetic
        // never wraps.
        let mut n = n;
        let mut count: i32 = 0;
        while n != 0 {
            n &= n - 1;
            count += 1;
        }
        count
    }
}
