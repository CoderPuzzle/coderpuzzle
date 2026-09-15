impl Solution {
    pub fn min_end(n: i32, x: i32) -> i64 {
        // Every element must contain every bit of x, so candidates are
        // exactly the supersets of x, ascending — their counter is spread
        // over the zero positions of x. The answer merges x with (n - 1):
        // walk bit slots upward, pushing each bit of (n - 1) into the next
        // zero slot of x. Answers reach up to bit 52 (x <= 10^8 keeps one
        // of the low 27 bits free, so free rank r lands at position
        // <= r + 26), inside 64-bit range.
        let mut ans = x as i64;
        let mut k = n as i64 - 1;
        let mut bit = 0u32;
        while k != 0 {
            if (ans >> bit) & 1 == 0 {
                if k & 1 == 1 {
                    ans |= 1i64 << bit;
                }
                k >>= 1;
            }
            bit += 1;
        }
        ans
    }
}
