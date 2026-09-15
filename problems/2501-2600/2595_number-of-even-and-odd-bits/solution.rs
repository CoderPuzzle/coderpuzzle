impl Solution {
    pub fn even_odd_bit(n: i32) -> Vec<i32> {
        // Peel the binary representation one bit at a time from the
        // right; the peel counter doubles as the bit index, whose parity
        // routes each set bit into the even or the odd bucket.
        let mut counts = vec![0, 0];
        let mut pos = 0;
        let mut v = n;
        while v > 0 {
            if v & 1 == 1 {
                counts[pos % 2] += 1;
            }
            v >>= 1;
            pos += 1;
        }
        counts
    }
}
